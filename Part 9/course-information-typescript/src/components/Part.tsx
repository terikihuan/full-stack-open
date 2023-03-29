import { CoursePart } from "../type"
import assertNever from "../utils/assertNever"

interface PartProp {
  course: CoursePart
}

const Part = (prop: PartProp) => {
  const course = prop.course

  switch (course.kind) {
    case "basic":
      return (
        <div>
          <h4>
            {course.name} {course.exerciseCount}
          </h4>
          <em>Description: {course.description}</em>
        </div>
      )
    case "background":
      return (
        <div>
          <h4>
            {course.name} {course.exerciseCount}
          </h4>
          <em>Description: {course.description}</em>
          <p>Background material: {course.backroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4>
            {course.name} {course.exerciseCount}
          </h4>
          <p>Group projects: {course.groupProjectCount}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h4>
            {course.name} {course.exerciseCount}
          </h4>
          <em>Description: {course.description}</em>
          <p>Required skills: {course.requirements.join(", ")}</p>
        </div>
      )
    default:
      assertNever(course)
      return null
  }
}

export default Part
