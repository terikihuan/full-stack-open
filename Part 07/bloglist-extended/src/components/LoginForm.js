/* eslint-disable no-unused-vars */
import React, { useState } from "react"

// Bootstrap components
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

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
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      {/* <form onSubmit={handleLogin} data-cy="loginForm">
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
      </form> */}
    </>
  )
}

export default LoginForm
