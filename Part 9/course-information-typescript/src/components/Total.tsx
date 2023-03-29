interface TotalProp {
  total: number
}

const Total = (prop: TotalProp) => {
  return <p>Number of exercises {prop.total}</p>
}

export default Total
