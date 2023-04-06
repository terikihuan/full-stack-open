import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          title:{" "}
          <input
            className="blogFormTitle"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            data-cy="titleInput"
          />
        </div>
        <div>
          author:{" "}
          <input
            className="blogFormAuthor"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            data-cy="authorInput"
          />
        </div>
        <div>
          url:{" "}
          <input
            className="blogFormUrl"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            data-cy="urlInput"
          />
        </div>
        <button className="submitBtn" type="submit" data-cy="createBlogBtn">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
