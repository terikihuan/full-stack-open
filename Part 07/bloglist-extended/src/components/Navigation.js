/* eslint-disable no-unused-vars */
import React from "react"
import { Link } from "react-router-dom"

// Bootstrap components
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"

const Navigation = ({ user, handlers }) => {
  const { handleLogout } = handlers
  const linkStyle = {
    color: "black",
    textDecoration: "none",
  }
  const navStyle = {
    width: "99%",
    backgroundColor: "lightgray",
    padding: 5,
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Bloglist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users" style={linkStyle}>
                Users
              </Link>
            </Nav.Link>
          </Nav>
          <Stack direction="horizontal" gap={3}>
            <Navbar.Text>Logged in as: {user.name} </Navbar.Text>
            <Button className="ml-3" onClick={handleLogout} variant="dark">
              logout
            </Button>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <div style={navStyle}>
    //   <Link to="/" style={linkStyle}>
    //     blogs
    //   </Link>
    //   <Link to="/users" style={linkStyle}>
    //     users
    //   </Link>
    //   {user.name} logged in <button onClick={handleLogout}>logout</button>
    // </div>
  )
}

export default Navigation
