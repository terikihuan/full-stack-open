import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("Create blog handler is called with the right arguments", async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const container = render(<BlogForm createBlog={createBlog} />).container

  const titleInput = container.querySelector(".blogFormTitle")
  const authorInput = container.querySelector(".blogFormAuthor")
  const urlInput = container.querySelector(".blogFormUrl")
  const submitBtn = container.querySelector(".submitBtn")

  const title = "Test title"
  const author = "Tester Admin"
  const url = "test.com"

  await user.type(titleInput, title)
  await user.type(authorInput, author)
  await user.type(urlInput, url)
  await user.click(submitBtn)

  expect(createBlog).toBeCalledWith({ title, author, url })
})
