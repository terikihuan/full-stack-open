import { useContext } from "react"
import AppContext from "../AppContext"

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const { notification } = useContext(AppContext)
  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
