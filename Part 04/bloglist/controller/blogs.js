const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const { userExtractor } = require("../utils/middleware")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user")
  response.json(blogs)
})

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user")
  blog ? response.json(blog) : response.status(404).end()
})

blogRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate("user")
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)
})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({
      error: "item does not exist",
    })
  }

  console.log(user.id.toString())
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({
      error: "unauthorize action",
    })
  }
  await Blog.findByIdAndDelete(request.params.id)

  // await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  ).populate("user")
  response.json(updatedBlog)
})

blogRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body

  const blogToAdd = await Blog.findById(request.params.id)
  blogToAdd.comments = blogToAdd.comments.concat(comment)
  const updatedBlog = await blogToAdd.save()
  response.json(updatedBlog)
})

module.exports = blogRouter
