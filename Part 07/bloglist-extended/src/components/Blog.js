/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link } from "react-router-dom"

const Blog = ({ sessionUser, blog, updateLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const linkStyle = {
    textDecoration: "none",
  }

  const [doShowDetails, setDoShowDetails] = useState(false)
  const { id, user, likes, url, title, author } = blog

  const handleLike = () => {
    updateLike(id, {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    })
  }

  const detailToggle = () => {
    setDoShowDetails(!doShowDetails)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlog(id)
    }
  }

  const details = () => (
    <>
      <div className="blogUrl">{url}</div>
      <div className="blogLikes" data-cy="likes">
        likes {likes}{" "}
        <button className="likeBtn" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{user.name}</div>
      {sessionUser.username === user.username ? (
        <button onClick={handleDelete}>delete</button>
      ) : null}
    </>
  )

  return (
    <div data-cy="blog">
      <div className="titleAndAuthor">
        <Link to={`/blogs/${id}`} style={linkStyle}>
          {title} by {author}{" "}
        </Link>
        {/* <button className="showDetailsBtn" onClick={detailToggle}>
          {doShowDetails ? "hide" : "view"}
        </button> */}
      </div>
      {doShowDetails && details()}
    </div>
  )
}

export default Blog
