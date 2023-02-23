import React from "react"

const CountryLine = ({ text, handleShow }) => {
  return (
    <div>
      {text} <button onClick={() => handleShow(text)}>show</button>{" "}
    </div>
  )
}

export default CountryLine
