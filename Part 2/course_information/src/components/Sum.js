import React from "react"

const Sum = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <strong>
      <p>total of {total} exercises</p>
    </strong>
  )
}

export default Sum
