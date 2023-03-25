import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState, useEffect, useRef } from "react"

const Books = ({ result }) => {
  const [genre, setGenre] = useState(null)
  const genresRef = useRef(new Set())

  if (result.loading) {
    return null
  }

  const books = result.data.allBooks

  if (genresRef.current.size === 0) {
    books.forEach((b) => {
      b.genres.forEach((g) => genresRef.current.add(g))
    })
  }

  // Functions
  const chooseGenre = async (genre) => {
    setGenre(genre)
    if (genre) {
      await result.refetch({ genre })
    } else {
      await result.refetch({ genre: "all" })
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre ?? "all"}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.from(genresRef.current).map((g, i) => (
        <button key={i} onClick={() => chooseGenre(g)}>
          {g}
        </button>
      ))}
      <button
        onClick={() => {
          chooseGenre(null)
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Books
