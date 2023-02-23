import React from "react"

const Filter = ({ data }) => {
  const { nameFilter, handleFilterChange } = data
  return (
    <div>
      filter shown with:{" "}
      <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
