import React from "react"

const Query = ({ searchterm, handleSearch }) => {
  return (
    <div>
      find countries <input value={searchterm} onChange={handleSearch} />{" "}
    </div>
  )
}

export default Query
