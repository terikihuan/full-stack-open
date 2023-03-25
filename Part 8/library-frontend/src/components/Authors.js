import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BORN } from "./../queries"
import { useState } from "react"

const Authors = () => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const result = useQuery(ALL_AUTHORS)
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return null
  }

  // Functions
  const submit = (e) => {
    e.preventDefault()
    editBorn({ variables: { name, born: Number(born) } })
    setName("")
    setBorn("")
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((a, i) => (
              <option key={i} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
