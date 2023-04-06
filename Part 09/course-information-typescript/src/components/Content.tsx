import { CoursePart } from "../type"
import Part from "./Part"

interface ContentProp {
  courses: CoursePart[]
}

const Content = (prop: ContentProp) => {
  return (
    <div>
      {prop.courses.map((c) => (
        <Part course={c} key={c.name} />
      ))}
    </div>
  )
}

export default Content
