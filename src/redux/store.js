import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authReducer'
import postReducer from './features/post/postReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  }
})

// import { configureStore } from '@reduxjs/toolkit'
// import authSlice from './features/auth/authSlice.js'
// import postSlice from './features/post/postSlice.js'

// export const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         post: postSlice
//     }
// })