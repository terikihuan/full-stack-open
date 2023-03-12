import { useState, useEffect, useRef } from "react"
// API services
import blogService from "./services/blogs"
import loginService from "./services/login"
// Components
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  // Ref
  const blogFormRef = useRef(null)

  // Effects
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
    }
  }, [])

  // Helpers
  const notify = (content) => {
    setMessage(content)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  const refreshBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  // Functions
  const handleLogin = async (crendentials) => {
    try {
      const loginUser = await loginService.login(crendentials)
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(loginUser)
      )
      setUser(loginUser)
      blogService.setToken(loginUser.token)

      notify("login successful")
    } catch (error) {
      notify(error.response.data.error)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
    blogService.setToken("")
    notify("logged out")
  }
  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.createBlog({ title, author, url })
    setBlogs(blogs.concat(savedBlog))
    notify(`a new blog ${title} by ${author} added`)
  }
  const handleLike = async (id, newBlog) => {
    await blogService.updateBlog(id, newBlog)
    refreshBlogs()
  }
  const handleRemoveBlog = async (id) => {
    await blogService.deleteBlog(id)
    refreshBlogs()
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        {message && <Notification message={message} />}
        <LoginForm logUserIn={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {message && <Notification message={message} />}
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
        <hr />
        <div data-cy="blogs">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={handleLike}
              removeBlog={handleRemoveBlog}
              sessionUser={user}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
