import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer"

export const notify = (dispatch, message, timeoutId = null) => {
  clearTimeout(timeoutId)
  dispatch(setNotification(message))
  return setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)
}
