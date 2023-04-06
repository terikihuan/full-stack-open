import React from "react"

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <div>has {votes} votes</div>
    </>
  )
}

export default Anecdote
