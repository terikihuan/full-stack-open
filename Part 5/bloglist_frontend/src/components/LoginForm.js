import React, { useState } from "react"

const LoginForm = ({ logUserIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    logUserIn({ username, password })
    setUsername("")
    setPassword("")
  }

  return (
    <>
      <form onSubmit={handleLogin} data-cy="loginForm">
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            data-cy="username"
          />
        </div>
        <div>
          password{" "}
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            data-cy="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
