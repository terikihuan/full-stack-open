import { useMutation, useQueryClient } from "react-query"
import anecService from "../anecService"
import { useContext } from "react"
import AppContext from "../AppContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(AppContext)
  // Mutations
  const newAnecMutation = useMutation(anecService.createAnec, {
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnec))
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: "SET",
        payload: "too short anecdote, must have length 5 or more",
      })
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE" })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
