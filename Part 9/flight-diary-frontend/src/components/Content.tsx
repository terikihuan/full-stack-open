import { DiaryEntry } from "./../types"
import Diary from "./Diary"

interface ContentProp {
  diaries: DiaryEntry[]
}

const Content = (prop: ContentProp) => {
  return (
    <div>
      {prop.diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </div>
  )
}

export default Content
