interface HeaderProp {
  header: string
}

const Header = (prop: HeaderProp) => {
  return <div>{prop.header}</div>
}

export default Header
