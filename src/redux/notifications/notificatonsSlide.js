import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của 1 slice trong redux
const initialState = {
  currentNotifications: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liêu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ invitationId, status }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

// Khởi tạo 1 slice trong kho lưu trữ - redux store
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    // Thêm mới 1 cái bản ghi notification vào đầu mảng currentNotifications
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      // unshift là thêm phân tử vào đầu mảng, ngược lại vs push
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  // extraReducers: Xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      // Đoạn này đảo ngược lại mảng invitations nhận được, đơn giản là để hiển thị cái mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // Cập nhật lại dữ liệu boardInvitation (bên trong nó sẽ có Status mới sau khi update)
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Actions: Là nơi dành cho các components bên dưới gọi = dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, vì những cái actions này đơn giản là đc thằng redux tạo tự động theo tên của reducer.
export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi = hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentNotifications = state => {
  return state.notifications.currentNotifications
}

// Cái file này tên là notificationsSlice nhưng ta sẽ export 1 thứ tên là Reducer,
export const notificationsReducer = notificationsSlice.reducer
