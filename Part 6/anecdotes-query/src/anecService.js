import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAnecs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnec = async (newAnec) => {
  const response = await axios.post(baseUrl, newAnec)
  return response.data
}

const updateAnec = async (updatedAnec) => {
  const response = await axios.put(`${baseUrl}/${updatedAnec.id}`, updatedAnec)
  return response.data
}

const anecService = {
  getAnecs,
  createAnec,
  updateAnec,
}

export default anecService
