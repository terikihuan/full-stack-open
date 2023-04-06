/* eslint-disable no-unused-vars */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { displayMessage } from "./reducers/notiReducer"
import { Routes, Route, useMatch } from "react-router-dom"
// API services
import blogService from "./services/blogs"
// Reducers
import { createBlog, deleteBlog, getBlogs } from "./reducers/blogReducer"
import { clearUser, getUsers, login, setUser } from "./reducers/userReducer"
import { loginUserSelector } from "./reducers/userReducer"
import { likeBlog } from "./reducers/blogReducer"
// Components
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import BlogsPage from "./pages/BlogsPage"
import UsersPage from "./pages/UsersPage"
import SingleUserPage from "./pages/SingleUserPage"
import SingleBlogPage from "./pages/SingleBlogPage"
import Navigation from "./components/Navigation"

// Bootstrap Component
import Container from "react-bootstrap/Container"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector((state) => state.notification)
  const user = useSelector(loginUserSelector)
  const users = useSelector((state) => state.user.users)
  const dispatch = useDispatch()

  // Ref
  const blogFormRef = useRef(null)

  // Matches
  const userMatch = useMatch("/users/:id")
  const singleUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null
  const blogMatch = useMatch("/blogs/:id")
  const singleBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  // Effects
  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loginUser))
      blogService.setToken(loginUser.token)
    }
  }, [])

  // Helpers
  const notify = (content) => {
    dispatch(displayMessage(content, 4))
  }

  // Functions
  const handleLogin = async (crendentials) => {
    try {
      dispatch(login(crendentials))
      notify("login successful")
    } catch (error) {
      notify(error.response.data.error)
      // console.log(error)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(clearUser())
    blogService.setToken("")
    notify("logged out")
  }
  const handleLike = async (id, newBlog) => {
    dispatch(likeBlog({ id, newBlog }))
    // notify(`liked '${newBlog.title}'`)
  }
  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url }))
    notify(`a new blog ${title} by ${author} added`)
  }
  const handleRemoveBlog = async (id) => {
    dispatch(deleteBlog(id))
  }

  if (!user) {
    return (
      <div>
        <Container>
          <h2>Log in to application</h2>
          {message && <Notification message={message} />}
          <LoginForm logUserIn={handleLogin} />
        </Container>
      </div>
    )
  } else {
    return (
      <div>
        <Navigation user={user} handlers={{ handleLogout }} />
        <Container>
          <h2>Blogs</h2>
          {message && <Notification message={message} />}
          {/* <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p> */}
          <Routes>
            <Route
              path="/"
              element={
                <BlogsPage
                  user={user}
                  blogs={blogs}
                  blogFormRef={blogFormRef}
                  handlers={{
                    handleLike,
                    handleCreateBlog,
                    handleRemoveBlog,
                  }}
                />
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <SingleBlogPage blog={singleBlog} updateLike={handleLike} />
              }
            />
            <Route
              path="/users/:id"
              element={<SingleUserPage user={singleUser} />}
            />
            <Route path="/users" element={<UsersPage users={users} />} />
          </Routes>
        </Container>
      </div>
    )
  }
}

export default App
