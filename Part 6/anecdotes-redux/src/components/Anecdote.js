import React from "react"
import { useDispatch } from "react-redux"
import { updateAnecdoteVote } from "../reducers/anecdoteReducer"
import { displayMessage } from "./../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(updateAnecdoteVote(id, anecdote))
    dispatch(displayMessage(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
