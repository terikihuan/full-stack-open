import React from "react"
import StatisticLine from "./StatisticLine"

const Statistics = ({ data }) => {
  const { good, neutral, bad, all, average, positive } = data

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={all} />
          <StatisticLine label="average" value={average} />
          <StatisticLine label="positive" value={positive} unit="%" />
        </tbody>
      </table>
    )
  }
}

export default Statistics
