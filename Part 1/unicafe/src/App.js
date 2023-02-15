import { useState } from "react"
import Header from "./Header"
import Button from "./Button"
import Statistics from "./Statistics"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    // setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    // setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    // setAll(all + 1)
  }

  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = (good / all) * 100 || 0

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Header text="statistics" />
      <Statistics data={{ good, neutral, bad, all, average, positive }} />
    </div>
  )
}

export default App
