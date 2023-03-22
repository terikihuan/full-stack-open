/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

// Async thunks
export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
  try {
    const resp = await blogService.getAll()
    const sortedBlogs = resp.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  } catch (error) {
    console.log(error)
  }
})
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload) => {
    try {
      const newBlog = await blogService.createBlog(payload)
      return newBlog
    } catch (error) {
      console.log(error)
    }
  }
)
export const likeBlog = createAsyncThunk("blogs/likeBlog", async (payload) => {
  try {
    const { id, newBlog } = payload
    const updatedBlog = await blogService.updateBlog(id, newBlog)
    return updatedBlog
  } catch (error) {
    console.log(error)
  }
})
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (payload) => {
    try {
      await blogService.deleteBlog(payload)
      return payload
    } catch (error) {
      console.log(error)
    }
  }
)
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async (payload) => {
    try {
      const { id, comment } = payload
      const updatedBlog = await blogService.addComment(id, { comment })
      return updatedBlog
    } catch (error) {
      console.log(error)
    }
  }
)

// Main feature slice
const blogSlide = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const id = action.payload.id
        const blogToChange = state.find((a) => a.id === id)
        const updatedBlog = {
          ...blogToChange,
          likes: action.payload.likes,
        }
        return state.map((a) => (a.id === id ? updatedBlog : a))
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload
        return state.filter((a) => a.id !== id)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const id = action.payload.id
        const blogToChange = state.find((a) => a.id === id)
        const updatedBlog = {
          ...blogToChange,
          comments: action.payload.comments,
        }
        return state.map((a) => (a.id === id ? updatedBlog : a))
      })
  },
})

export const { appendBlog, setBlogs } = blogSlide.actions
export default blogSlide.reducer
