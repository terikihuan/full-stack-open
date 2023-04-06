import React, { useState } from "react"
// import blogService from "./../services/blogs"
import { useDispatch } from "react-redux"
import { addComment } from "./../reducers/blogReducer"

// Bootstrap components
import Button from "react-bootstrap/Button"

const SingleBlogPage = ({ blog, updateLike }) => {
  if (!blog) {
    return null
  }

  const [comment, setComment] = useState("")
  const { id, user, likes, url, title, author, comments } = blog
  const dispatch = useDispatch()

  // Functions
  const handleLike = () => {
    updateLike(id, {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    })
  }
  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment({ id, comment }))
    setComment("")
  }

  return (
    <div>
      <h2>
        {title} by {author}
      </h2>
      <div>
        <a href={url}>{url}</a>
      </div>
      <div>
        {likes} likes <Button onClick={handleLike}>like</Button>
      </div>
      <div>added by {user.name}</div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit">add comment</Button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlogPage
