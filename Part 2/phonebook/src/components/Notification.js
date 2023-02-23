import React from "react"

const Notification = ({ message }) => {
  const { text, type } = message

  if (text === null) {
    return null
  }

  const informationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  const errorStyle = {
    ...informationStyle,
    color: "red",
  }

  return (
    <div style={type === "information" ? informationStyle : errorStyle}>
      {text}
    </div>
  )
}

export default Notification
