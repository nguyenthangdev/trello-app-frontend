import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlide'

/**
 * Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizeAxios hiện tại
 * Hiểu đơn giản: Khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 */

let axiosReduxStore
export const injectStore = (mainStore) => { axiosReduxStore = mainStore }

// Khởi tạo 1 đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10 // 10p

// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

// Interceptor Request: Can thiệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use((config) => {
  // Kỹ thuật chặn spam click (Chỉ click 1 lần)
  interceptorLoadingElements(true)
  return config
}, (error) => {
  return Promise.reject(error)
})

// Khởi tạo 1 cái promise cho việc gọi api refresh-token
// Mục đích tạo Promise này để khi nào gọi api refresh-token xong xuôi thì mới retry lại nhiều api bị lỗi trc đó. Fix trường hợp gọi api refresh-token nhiều lần
let refreshTokenPromise = null

// Interceptor Response: Can thiệp vào giữa những cái response nhận về
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Kỹ thuật chặn spam click (Chỉ click 1 lần)
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Moị mã http status code nằm ngoài khoảng 200 - 299 sẽ là error và rơi vào đây

  // Kỹ thuật chặn spam click (Chỉ click 1 lần)
  interceptorLoadingElements(false)

  // Quan trọng: Xử lý refresh token tự động
  // Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
  if (error.response?.status === 401) axiosReduxStore.dispatch(logoutUserAPI(false))

  // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
  // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config

  if (error.response?.status === 410 && originalRequests) {
    // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh-token, đồng thời gán vào cho cái refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // Đồng thời accessToken đã nằm trong httpOnly cookie (Xử lý ở BE)
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận bất kỳ lỗi nào từ api refresh-token thì cứ logout luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))
          // Tránh lỗi gọi 2 lần api logout
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù api có thành công hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
          refreshTokenPromise = null
        })
    }
    // Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây.
    return refreshTokenPromise.then((accessToken) => {
      // Bước 1: Đối với trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây.
      // Hiện tại ở đây ko cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (Xử lý phía BE) sau khi gọi api refresh-token thành công

      // Bước 2: Bước quan trọng, return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi.
      return authorizedAxiosInstance(originalRequests)
    })
  }

  // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (Viết code 1 lần: Clean Code)
  // console.log error ra là sẽ thấy cấu trúc data dẫn tới message lỗi như dưới đây
  let errorMessage = error?.message

  if (error.response?.data?.message) errorMessage = error.response?.data?.message

  // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
  if (error.response?.status !== 410) toast.error(errorMessage)

  return Promise.reject(error)
})


export default authorizedAxiosInstance
