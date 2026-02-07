import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from '~/redux/activeBoard/activeBoardSlice'
import { userReducer } from '~/redux/user/userSlide'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default là localstorage

const rootPersistConfig = {
  key: 'root', // key của cái persist do chúng ta chỉ định, cứ để mặc định là root
  storage: storage, // Biến storage ở trên - lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slide dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt 
  // blacklist: ['user'] // Định nghĩa các slide ko đc phép duy trì qua mỗi lần f5 trình duyệt
}

// Combine các reducers trong dự án ở đây
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// Thực hiện persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
