import React from "react"
import Part from "./Part"
import Sum from "./Sum"

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
      <Sum parts={parts} />
    </>
  )
}

export default Content
