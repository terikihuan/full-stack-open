import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer"
import notiReducer from "./reducers/notiReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
