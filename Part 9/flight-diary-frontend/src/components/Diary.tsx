import { DiaryEntry } from "../types"

interface DiaryProp {
  diary: DiaryEntry
}

const Diary = (prop: DiaryProp) => {
  const { date, visibility, weather, comment } = prop.diary
  return (
    <div>
      <h3>{date}</h3>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      <div>comment: {comment}</div>
    </div>
  )
}

export default Diary
