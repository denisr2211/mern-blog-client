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

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts')
    return data
  } catch (error) {
    console.log(error)
  }
})

export const removePost = createAsyncThunk('/post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk('/post/updatePost', async (updatedPost) => {
  try {
    const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
    return data
  } catch (error) {
    console.log(error)
  }
})

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
      //Создани поста
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
      })
      //Получение всех постов
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false
        state.status = action.payload.message
        state.posts = action.payload.posts
        state.popularPosts = action.payload.popularPosts
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false
      })
      //Удаление поста
      .addCase(removePost.pending, (state) => {
        state.loading = true
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false
        state.status = action.payload.message
        state.posts = state.posts.filter((post) => post._id !== action.payload._id)
      })
      .addCase(removePost.rejected, (state) => {
        state.loading = false
      })
      //Редактирование поста
      .addCase(updatePost.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        //state.status = action.payload.message
        const index = state.posts.findIndex((post) => post._id === action.payload._id)
        state.posts[index] = action.payload
      })
      .addCase(updatePost.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { addedPost } = postReducer.actions
export default postReducer.reducer