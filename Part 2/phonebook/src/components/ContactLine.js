import React from "react"

const ContactLine = ({ person, handleDelete }) => {
  const { id, name, number } = person

  return (
    <div>
      {name} {number}{" "}
      <button onClick={() => handleDelete(id, name)}>Delete</button>
    </div>
  )
}

export default ContactLine
