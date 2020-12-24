import Joi from 'joi'

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
