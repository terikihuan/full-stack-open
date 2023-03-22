import React from "react"

// Bootstrap component
import Alert from "react-bootstrap/Alert"

const Notification = ({ message }) => {
  // const style = {
  //   color: "red",
  //   background: "lightgrey",
  //   fontSize: "20px",
  //   borderStyle: "solid",
  //   borderRadius: "5px",
  //   padding: "10px",
  //   marginBottom: "10px",
  // }

  if (message === null) {
    return null
  }
  return <Alert variant="danger">{message}</Alert>
  // <div className="error" style={style} data-cy="notification">
  //   {message}
  // </div>
}

export default Notification
