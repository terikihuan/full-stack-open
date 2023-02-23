import React from "react"

const NewPersonForm = ({ data }) => {
  const {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    handleSubmit,
  } = data
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm
