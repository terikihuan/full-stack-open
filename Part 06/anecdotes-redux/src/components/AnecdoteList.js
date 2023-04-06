import React from "react"
import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      const anecForSort = [...anecdotes]
      return anecForSort.sort((a, b) => b.votes - a.votes)
    }

    const filteredAnecs = anecdotes.filter((a) => {
      return a.content.toLowerCase().includes(filter)
    })
    const anecForSort = [...filteredAnecs]
    return anecForSort.sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList
