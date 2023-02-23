import React from "react"
import ContactLine from "./ContactLine"

const Contacts = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <ContactLine
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </>
  )
}

export default Contacts
