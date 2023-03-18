import { useQuery, useQueryClient, useMutation } from "react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import anecService from "./anecService"
import AppContext from "./AppContext"
import { useContext } from "react"

const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(AppContext)

  // Mutations
  const updateAnecMutation = useMutation(anecService.updateAnec, {
    onSuccess: (updatedAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map((a) => (a.id === updatedAnec.id ? updatedAnec : a))
      )
    },
  })

  const handleVote = (anecdote) => {
    console.log("vote")
    updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: "SET",
      payload: `anecdote '${anecdote.content}' voted`,
    })
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" })
    }, 5000)
  }

  const result = useQuery("anecdotes", anecService.getAnecs, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
