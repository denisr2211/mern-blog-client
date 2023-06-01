import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk('comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getPostComments = createAsyncThunk('comment/getPostComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const commentReducer = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Создание коммента
            .addCase(createComment.pending, (state) => {
                state.loading = true
                //state.status = null
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false
                //state.status = action.payload.message
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false
                //state.status = action.payload?.message
            })
            //Получение комментов
            .addCase(getPostComments.pending, (state) => {
                state.loading = true
                //state.status = null
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false
                //state.status = action.payload.message
                state.comments = action.payload
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.loading = false
                //state.status = action.payload?.message
            })
    }
})

export default commentReducer.reducer