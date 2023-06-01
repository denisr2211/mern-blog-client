import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authReducer'
import postReducer from './features/post/postReducer'
import commentReducer from './features/comment/commentReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer
  }
})