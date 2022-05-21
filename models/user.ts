export enum TitlesEnum {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Miss = 'Miss',
  Ms = 'Ms',
}

export enum RolesEnum {
  User = 'User',
  Admin = 'Admin',
}

export type UserModel = {
  id: string
  title: TitlesEnum
  firstName: string
  lastName: string
  email: string
  role: RolesEnum
  password: string
  dateCreated: Date
  dateUpdated: Date
  confirmPassword?: string
  isDeleting?: boolean
}
