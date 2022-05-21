import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Link } from '../../components'
import { RolesEnum, TitlesEnum, UserModel } from '../../models/user'
import { alertService, CreateUserParams, EditUserParams, userService } from '../../services'

type Props = {
  user: UserModel
}

export const AddEdit = ({ user }: Props) => {
  const isAddMode = !user

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string()
      .transform(x => (x === '' ? undefined : x))
      .concat(isAddMode ? Yup.string().required('Password is required') : Yup.string())
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .transform(x => (x === '' ? undefined : x))
      .when('password', (password, schema) => {
        if (password || isAddMode) return schema.required('Confirm Password is required')
      })
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  const formOptions = { resolver: yupResolver(validationSchema), defaultValues: {} }

  // set default form values if in edit mode
  if (!isAddMode) {
    const { password, confirmPassword, ...defaultValues } = user
    formOptions.defaultValues = defaultValues
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data: { [key: string]: any }) {
    return isAddMode
      ? createUser({
          firstName: data.firstName,
          lastName: data.lastName,
          title: data.title,
          email: data.email,
          password: data.password,
          role: data.role,
        } as CreateUserParams)
      : updateUser(user.id, data)
  }

  function createUser(data: CreateUserParams) {
    return userService
      .create(data)
      .then(() => {
        alertService.success('User added', { keepAfterRouteChange: true })
        router.push('.')
      })
      .catch(e => alertService.error(e))
  }

  function updateUser(id: string, data: EditUserParams) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true })
        router.push('..')
      })
      .catch(e => alertService.error(e))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
      <div className="form-row">
        <div className="form-group col">
          <label>Title</label>
          <select {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
            <option value=""></option>
            {Object.entries(TitlesEnum).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>First Name</label>
          <input
            type="text"
            {...register('firstName')}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-7">
          <label>Email</label>
          <input type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="form-group col">
          <label>Role</label>
          <select {...register('role')} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
            <option value=""></option>
            {Object.entries(RolesEnum).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.role?.message}</div>
        </div>
      </div>
      {!isAddMode && (
        <div>
          <h3 className="pt-3">Change Password</h3>
          <p>Leave blank to keep the same password</p>
        </div>
      )}
      <div className="form-row">
        <div className="form-group col">
          <label>
            Password
            {!isAddMode &&
              (!showPassword ? (
                <span>
                  {' '}
                  -{' '}
                  <a onClick={() => setShowPassword(!showPassword)} className="text-primary">
                    Show
                  </a>
                </span>
              ) : (
                <em> - {user.password}</em>
              ))}
          </label>
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group col">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
          {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
          Save
        </button>
        <button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">
          Reset
        </button>
        <Link href="/users" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  )
}
