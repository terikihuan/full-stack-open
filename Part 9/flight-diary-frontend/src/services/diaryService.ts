import axios from "axios"
import { NewDiaryEntry, DiaryEntry } from "../types"

const baseUrl = "http://localhost:3001/api/diaries"

export const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const createEntry = async (entry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry)
  return response.data
}
