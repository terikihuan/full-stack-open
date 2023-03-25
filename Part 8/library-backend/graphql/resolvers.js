const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Book = require("../models/book")
const Author = require("../models/author")
const User = require("../models/user")

// Pubsub
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate("author")
      console.log(args)
      if (!args || args.genre === "all") {
        return result
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        // result = await Book.find({ author: author._id })
        result = result.filter(
          (b) => b.author.toString() === author._id.toString()
        )
      }

      if (args.genre) {
        result = result.filter((b) => b.genres.includes(args.genre))
      }
      // console.log(result)
      return result
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated...", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }

      const author = await Author.findOne({ name: args.author })
      let book

      try {
        if (author) {
          const newBook = new Book({ ...args, author: author._id })
          book = await newBook.save()
          book = await newBook.populate("author")
        } else {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          const newBook = new Book({ ...args, author: newAuthor._id })
          book = await newBook.save()
          book = await newBook.populate("author")
        }
      } catch (error) {
        throw new GraphQLError("Adding new book failed...", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        })
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated...", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }
      // const author = authors.find((a) => a.name === args.name)
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      return newUser.save().catch((error) => {
        throw new GraphQLError("Creating the user failed...", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const tokenInfo = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(tokenInfo, process.env.JWT_SECRET) }
    },
  },

  Author: {
    bookCount: (root) => {
      let count = 0
      books.forEach((book) => {
        if (book.author === root.name) count++
      })
      return count
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
