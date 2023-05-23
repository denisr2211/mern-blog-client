import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  status: null,
}

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const postReducer = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addedPost: (state) => {
      // под вопросом...
      return {
        ...state,
        loading: false,
        status: null
      }
      
      // state.loading = false
      // state.status = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.status = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.status = action.payload.message
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.status = action.payload?.message
      });
  },
})

export const { addedPost } = postReducer.actions
export default postReducer.reducer