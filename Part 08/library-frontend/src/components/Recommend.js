import React from "react"
import { useQuery } from "@apollo/client"
import { ME } from "../queries"

const Recommend = ({ result, userResult }) => {
  if (result.loading || userResult.loading) {
    return null
  }
  const books = result.data.allBooks
  const preference = userResult.data.me.favoriteGenre
  const filteredBooks = books.filter((b) => b.genres.includes(preference))

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{preference}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
