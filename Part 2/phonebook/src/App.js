import { useEffect, useState } from "react"
import NewPersonForm from "./components/NewPersonForm"
import Filter from "./components/Filter"
import Contacts from "./components/Contacts"
import contactService from "./services/contacts"
import Notification from "./components/Notification"

const DEFAULT_MESSAGE = { text: null, type: null }

const App = () => {
  // Variables
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [message, setMessage] = useState(DEFAULT_MESSAGE)

  // Effects
  useEffect(() => {
    contactService.getAllContact().then((contacts) => {
      setPersons(contacts)
    })
  }, [])

  // Functions
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setNameFilter(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const duplicate = persons.find((person) => person.name === newName)
    // If name is not duplicate
    if (duplicate === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      contactService.createContact(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact))
      })
      setMessage({ text: `Added ${newName}`, type: "information" })
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE)
      }, 3000)
      // If name is already in contacts
    } else if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const changedPerson = {
        ...duplicate,
        number: newNumber,
      }
      contactService
        .updateContact(duplicate.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id === duplicate.id ? returnedPerson : p))
          )
        })
    }
    setNewName("")
    setNewNumber("")
  }
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
        .catch((error) => {
          setMessage({
            text: `Information of ${name} has been removed from server`,
            type: "error",
          })
          setPersons(persons.filter((p) => p.id !== id))
          setTimeout(() => {
            setMessage(DEFAULT_MESSAGE)
          }, 3000)
        })
    }
  }

  let filterdPersons = persons
  for (let c of nameFilter) {
    filterdPersons = filterdPersons.filter((person) =>
      person.name.toLowerCase().includes(c)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter data={{ nameFilter, handleFilterChange }} />

      <h3>Add a new</h3>
      <NewPersonForm
        data={{
          newName,
          newNumber,
          handleNameChange,
          handleNumberChange,
          handleSubmit,
        }}
      />

      <h3>Numbers</h3>
      <Contacts persons={filterdPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
