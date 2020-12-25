import Joi from 'joi'
import jwtDecode from 'jwt-decode'
import User from 'models/user'

export const lettersOnly = (label: string) => {
  return Joi.string()
    .label(label)
    .regex(/^[A-Za-z\s]*$/)
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'any.empty':
            err.message = `"${label}" is not allowed to be empty`
            break
          case 'string.pattern.base':
            err.message = `"${label}" must not have a number or special character`
            break
          default:
            break
        }
      })
      return errors
    })
}

export const nameCapitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export const getDecodeToken = () => {
  const token = localStorage.getItem('access-token')

  try {
    if (token) {
      return jwtDecode<User>(token)
    }
  } catch (error) {
    return null
  }
}
