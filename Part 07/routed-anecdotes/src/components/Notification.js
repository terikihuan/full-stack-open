import React from "react"

const Notification = ({ notification }) => {
  const style = {
    margin: 5,
    borderStyle: "solid",
    borderRadius: "3px",
    borderColor: "gray",
    padding: 3,
  }

  if (!notification) {
    return null
  }
  return <div style={style}>{notification}</div>
}

export default Notification
