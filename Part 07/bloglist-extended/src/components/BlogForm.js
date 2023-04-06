import React, { useState } from "react"

// Bootstrap components
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
  }

  return (
    <div className="col-xs-4">
      <Form onSubmit={handleSubmit} className="col-xs-4">
        <Form.Group className="mb-3">
          {/* <Form.Label>Username</Form.Label> */}
          <Form.Control
            type="text"
            className=""
            placeholder="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Author"
            value={title}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
      {/* <form action="" onSubmit={handleSubmit}>
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
      </form> */}
    </div>
  )
}

export default BlogForm
