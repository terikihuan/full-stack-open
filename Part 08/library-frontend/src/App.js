import { useState, useEffect } from "react"
// Components
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"

import { Link, Routes, Route, useNavigate } from "react-router-dom"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from "./queries"
import Recommend from "./components/Recommend"
import updateCache from "./utils/updateCache"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  // Queries data
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: "all" },
  })
  const userResult = useQuery(ME)

  // Subscriptions
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      if (data) {
        const newBook = data.data.bookAdded
        window.alert(`${newBook.title} by ${newBook.author.name} added`)
        updateCache(client.cache, { query: ALL_BOOKS }, newBook)
      }
    },
  })

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token") || null)
    userResult.startPolling(500)
    setTimeout(() => {
      userResult.stopPolling()
    }, 3000)
  }, [userResult, token])

  // Function
  const logout = () => {
    setToken(null)
    localStorage.removeItem("library-user-token")
    client.resetStore()
    navigate("/")
  }

  return (
    <div>
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/">
          <button>books</button>
        </Link>
        {token !== null ? (
          <>
            <Link to="/add">
              <button>add book</button>
            </Link>
            <Link to="/recommend">
              <button>recommend</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/recommend"
          element={<Recommend result={booksResult} userResult={userResult} />}
        />
        <Route path="/" element={<Books result={booksResult} />} />
      </Routes>
    </div>
  )
}

export default App
