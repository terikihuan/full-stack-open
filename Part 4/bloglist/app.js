require("dotenv").config()
const http = require("http")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
// Routes
const blogRouter = require("./controller/blogs")
const userRouter = require("./controller/users")
const loginRouter = require("./controller/login")

const {
  tokenExtractor,
  userExtractor,
  errorHandler,
} = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")

// Connect to MongoDB
mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(errorHandler)

module.exports = app
