import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  if (notification === "") {
    style.display = "none"
  }
  return <div style={style}>{notification}</div>
}

export default Notification
