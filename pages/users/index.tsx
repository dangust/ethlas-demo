import { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from '../../components'
import { UserModel } from '../../models/user'
import { userService } from '../../services'

export default function Users() {
  const [users, setUsers] = useState<UserModel[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    userService.getAll().then(res => {
      setUsers(res)
      setIsFetching(false)
    })
  }, [])

  function deleteUser(id: string) {
    setUsers(
      users.map(x => {
        if (x.id === id) {
          x.isDeleting = true
        }
        return x
      }),
    )
    userService.delete(id).then(() => {
      setUsers(users => users.filter(x => x.id !== id))
    })
  }

  const renderContent = () => {
    if (isFetching) {
      return <BallTriangle color="green" height={32} width={32} />
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Name</th>
            <th style={{ width: '30%' }}>Email</th>
            <th style={{ width: '30%' }}>Role</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user.id}>
                <td>
                  {user.title} {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}>
                    {user.isDeleting ? <span className="spinner-border spinner-border-sm"></span> : <span>Delete</span>}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan={4} className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Add User
      </Link>
      {renderContent()}
    </div>
  )
}
