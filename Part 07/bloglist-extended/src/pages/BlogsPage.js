/* eslint-disable no-unused-vars */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useRef } from "react"
// Components
import Togglable from "./../components/Togglable"
import BlogForm from "./../components/BlogForm"
import Blog from "../components/Blog"

// Bootstrap components
import ListGroup from "react-bootstrap/ListGroup"

const BlogsPage = ({ user, blogs, blogFormRef, handlers }) => {
  // Variables
  const { handleLike, handleCreateBlog, handleRemoveBlog } = handlers

  return (
    <div>
      <Togglable buttonLabel="Create new" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <hr />

      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Blog
              blog={blog}
              updateLike={handleLike}
              removeBlog={handleRemoveBlog}
              sessionUser={user}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      {/* <div data-cy="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={handleLike}
            removeBlog={handleRemoveBlog}
            sessionUser={user}
          />
        ))}
      </div> */}
    </div>
  )
}

export default BlogsPage
