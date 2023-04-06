import React, { useState, useEffect } from "react"
import { useMutation, useApolloClient } from "@apollo/client"
import { LOGIN, ME } from "../queries"
import { useNavigate } from "react-router-dom"

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onError: (error) => {
      console.log(error)
    },
  })
  const navigate = useNavigate()
  const client = useApolloClient()

  // Effects
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    client.resetStore()
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
