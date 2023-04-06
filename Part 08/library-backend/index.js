// Servers stuffs
const http = require("http")
const express = require("express")
const cors = require("cors")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

// Schema, resolvers, models
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")
const User = require("./models/user")

// Misc.
require("dotenv").config()
const jwt = require("jsonwebtoken")

// Connect to MONGDB
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

// Async wrapper
const start = async () => {
  // Create Http server
  const app = express()
  const httpServer = http.createServer(app)

  // Setup schema (schema = resolvers + typeDefs)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // Create Websocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/", // Same path as app.use()
  })

  // Websocket server's info for shutting down later
  const serverCleanup = useServer({ schema }, wsServer)

  // Create Apollo server
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  // Start the Apollo server
  await server.start()

  // Using middlewares
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    })
  )

  // Run the whole server
  // Server listens on the HTTP and WebSocket transports simultaneously
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
