import { http } from '../helpers/api-client'
import { RolesEnum, TitlesEnum } from '../models/user'

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}

const apiRoute = 'users'

export type CreateUserParams = {
  id: string
  title: TitlesEnum
  firstName: string
  lastName: string
  email: string
  role: RolesEnum
  password: string
}

export type EditUserParams = {
  title?: TitlesEnum
  firstName?: string
  lastName?: string
  email?: string
  role?: RolesEnum
  password?: string
}

function getAll() {
  return http.get(apiRoute).then(res => res.data)
}

function getById(id: string) {
  return http.get(`${apiRoute}/${id}`).then(res => res.data)
}

function create(params: CreateUserParams) {
  return http.post(apiRoute, params)
}

function update(id: string, params: EditUserParams) {
  return http.put(`${apiRoute}/${id}`, params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return http.delete(`${apiRoute}/${id}`)
}
