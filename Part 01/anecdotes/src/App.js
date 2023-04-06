import { useState } from "react"
import Button from "./Button"
import Anecdote from "./Anecdote"
import Header from "./Header"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newIndex)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const indexOfHighestPoint = points.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  )

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <br />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNext} />
      <hr />
      <Header text="Anecdote with most votes" />
      <Anecdote
        text={anecdotes[indexOfHighestPoint]}
        votes={points[indexOfHighestPoint]}
      />
    </div>
  )
}

export default App
