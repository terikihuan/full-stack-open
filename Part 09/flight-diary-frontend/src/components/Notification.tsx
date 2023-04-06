import React from "react"

interface NotificationProp {
  message: string
}

const Notification = (prop: NotificationProp) => {
  const style = {
    color: "red",
  }
  const { message } = prop
  if (message) return <div style={style}>{prop.message}</div>
  return null
}

export default Notification
