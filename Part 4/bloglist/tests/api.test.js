const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const bcrypt = require("bcrypt")
const User = require("../models/user")

// Initialize test DB
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash("sekret", 10)
  const user = new User({ username: "root", passwordHash })
  await user.save()
})

// GET
describe("when retrieving blogs,", () => {
  test("they are returned in the right amount", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test("they have property of 'id'", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })
})

// POST
describe("when creating a new blog", () => {
  test("a valid blog can be added", async () => {
    const response = await api.post("/api/login").send({
      username: "root",
      password: "sekret",
    })

    const newBlog = {
      title: "Huan's portfolio",
      author: "Huan Zhao",
      url: "https://terikihuan.com/",
      likes: 10,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${response.body.token}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain("Huan's portfolio")
  }, 100000)
  test("without the 'likes' property, it will default to 0", async () => {
    const newBlog = {
      title: "No one likes this post",
      author: "John Doe",
      url: "https://zerolikes.com/",
    }
    await api.post("/api/blogs").send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const newBlogOnDb = blogsAtEnd.find(
      (blog) => blog.title === "No one likes this post"
    )
    expect(newBlogOnDb.likes).toBe(0)
  })
  test("without 'title' or 'url', it will result in 400", async () => {
    // title: "No one likes this post",
    const newBlog = {
      author: "Oliver Smith",
      url: "https://zerolikes.com/",
      likes: 1,
    }
    await api.post("/api/blogs").send(newBlog).expect(400)
  })
})

// DELETE
describe("deletion of a note", () => {
  let token = ""
  beforeEach(async () => {
    const response = await api.post("/api/login").send({
      username: "root",
      password: "sekret",
    })
    token = response.body.token
  })

  test("succeeds with status code 204 if id is valid", async () => {
    // const response = await api.post("/api/login").send({
    //   username: "root",
    //   password: "sekret",
    // })

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)
  })

  test("results in the actual deletion on DB", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const IDs = blogsAtEnd.map((blog) => blog.id)
    expect(IDs).not.toContain(blogToDelete.id)
  })
})

// PUT
describe("updating of a blog", () => {
  test("results in the actual update on DB", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })
})

// USER
describe("when there is initially one user in db", () => {
  // beforeEach(async () => {
  //   await User.deleteMany({})

  //   const passwordHash = await bcrypt.hash("sekret", 10)
  //   const user = new User({ username: "root", passwordHash })

  //   await user.save()
  // })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with a username shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "ML",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("creation fails with a password shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "12",
    }

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  // test("creation fails with proper statuscode and message if username already taken", async () => {
  //   const usersAtStart = await helper.usersInDb()

  //   const newUser = {
  //     username: "root",
  //     name: "Superuser",
  //     password: "salainen",
  //   }

  //   const result = await api
  //     .post("/api/users")
  //     .send(newUser)
  //     .expect(400)
  //     .expect("Content-Type", /application\/json/)

  //   expect(result.body.error).toContain("expected `username` to be unique")

  //   const usersAtEnd = await helper.usersInDb()
  //   expect(usersAtEnd).toEqual(usersAtStart)
  // })
})

// Close DB
afterAll(async () => {
  await mongoose.connection.close()
})
