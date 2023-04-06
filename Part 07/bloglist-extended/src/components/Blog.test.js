import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("when rendering a blog", () => {
  const blog = {
    title: "Blog title used for testing",
    author: "Tester Admin",
    url: "testurl.com",
    likes: 0,
    user: {
      username: "terikihuan",
      name: "K.Huan",
    },
  }
  let container
  const likeBlog = jest.fn()
  beforeEach(() => {
    container = render(<Blog blog={blog} updateLike={likeBlog} />).container
  })

  test("the title and author are displayed", () => {
    const titleAndAuthor = container.querySelector(".titleAndAuthor")
    expect(titleAndAuthor).toHaveTextContent(`${blog.title} by ${blog.author}`)
  })

  test("details like url or likes are not displayed", () => {
    const blogUrl = container.querySelector(".blogUrl")
    const blogLikes = container.querySelector(".blogLikes")
    expect(blogUrl).toBeNull()
    expect(blogLikes).toBeNull()
  })

  test("after clicking the 'view' button, details like url and likes are displayed", async () => {
    const user = userEvent.setup()
    const button = container.querySelector(".showDetailsBtn")
    await user.click(button)

    const blogUrl = container.querySelector(".blogUrl")
    const blogLikes = container.querySelector(".blogLikes")
    expect(blogUrl).toHaveTextContent("testurl.com")
    expect(blogLikes).toHaveTextContent("0")
  })

  test("clicking the 'like' button twice results in the event handler being called twice", async () => {
    const user = userEvent.setup()
    const detailsButton = container.querySelector(".showDetailsBtn")
    await user.click(detailsButton)

    const likeButton = container.querySelector(".likeBtn")
    await user.dblClick(likeButton)
    expect(likeBlog).toBeCalledTimes(2)
  })
})
