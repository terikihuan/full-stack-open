import { useState } from "react"
import { createEntry } from "../services/diaryService"
import { Visibility, Weather } from "../types"
import Notification from "./Notification"
import axios from "axios"

interface DiaryFormProp {
  notify: (mes: string) => void
  refetch: () => void
  message: string
}

const DiaryForm = (prop: DiaryFormProp) => {
  const visabilities = Object.values(Visibility).map((v) => v.toString())
  const weathers = Object.values(Weather).map((v) => v.toString())

  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await createEntry({
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      })
      setDate("")
      setVisibility("")
      setWeather("")
      setComment("")
      prop.refetch()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        prop.notify(error.response.data)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={prop.message} />
      <form action="" onSubmit={onSubmit}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility{"   "}
          {visabilities.map((v, i) => (
            <span key={i}>
              <input
                name="visibility"
                type="radio"
                id={v}
                value={v}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <label htmlFor={v}>{v}</label>
            </span>
          ))}
        </div>
        <div>
          weather{"   "}
          {weathers.map((w, i) => (
            <span key={i}>
              <input
                name="weather"
                type="radio"
                id={w}
                value={w}
                onChange={(e) => setWeather(e.target.value)}
              />
              <label htmlFor={w}>{w}</label>
            </span>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm
