/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from "react"
import { Link } from "react-router-dom"

const UsersPage = ({ users }) => {
  // const users = useSelector((state) => state.user.users)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
