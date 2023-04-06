export interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string
  kind: "background"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[]
  kind: "special"
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial
