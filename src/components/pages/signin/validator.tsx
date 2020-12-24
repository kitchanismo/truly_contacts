import Joi from 'joi'
import User from 'models/user'

export default {
  username: Joi.string()
    .alphanum()
    .min(1)
    .max(150)
    .required()
    .label('Username'),
  first_name: Joi.optional(),
  last_name: Joi.optional(),
  email: Joi.optional(),
  password: Joi.string().min(8).max(65).required().label('Password'),
} as User
