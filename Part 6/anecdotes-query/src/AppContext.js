import { createContext, useReducer, useContext } from "react"

const AppContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
      return null
    default:
      return state
  }
}

export const AppContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  const value = { notification, notificationDispatch }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContext
