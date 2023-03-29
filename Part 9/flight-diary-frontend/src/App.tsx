import { useState, useEffect } from "react"
import { DiaryEntry } from "./types"
import DiaryForm from "./components/DiaryForm"
import Content from "./components/Content"
import { getAllEntries } from "./services/diaryService"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState("")

  // Effects
  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaries(data)
    })
  }, [])

  // Functions
  const notify = (mes: string) => {
    setMessage(mes)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }
  const refetch = async () => {
    const data = await getAllEntries()
    setDiaries(data)
  }

  return (
    <div className="App">
      <DiaryForm notify={notify} message={message} refetch={refetch} />
      <Content diaries={diaries} />
    </div>
  )
}

export default App
