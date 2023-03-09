import axios from "axios"

const baseUrl = "/api/persons"

const getAllContact = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

const createContact = (newContact) => {
  return axios.post(baseUrl, newContact).then((res) => res.data)
}

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data)
}

const updateContact = (id, newContact) => {
  return axios.put(`${baseUrl}/${id}`, newContact).then((res) => res.data)
}

const service = {
  getAllContact,
  createContact,
  deleteContact,
  updateContact,
}

export default service
