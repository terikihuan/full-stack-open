import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "./../services/blogs"
import userService from "./../services/users"

// Async thunks
export const login = createAsyncThunk("user/login", async (payload) => {
  try {
    const { username, password } = payload
    const user = await loginService.login({ username, password })
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
    blogService.setToken(user.token)
    return user
  } catch (error) {
    console.log(error)
  }
})
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const users = userService.getUsers()
    return users
  } catch (error) {
    console.log(error)
  }
})

// Main feature slice
const initialState = {
  loginUser: null,
  users: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loginUser = action.payload
    },
    clearUser: (state) => {
      state.loginUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loginUser = action.payload
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
  },
})

export const { setUser, clearUser } = userSlice.actions
export const loginUserSelector = (state) => {
  return state.user.loginUser
}
export default userSlice.reducer
