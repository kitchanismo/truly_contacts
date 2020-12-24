import Joi from 'joi'
import User from 'models/user'
import { lettersOnly } from 'utils/helper'

export default {
  username: Joi.string()
    .alphanum()
    .min(1)
    .max(150)
    .required()
    .label('Username'),
  first_name: lettersOnly('Firstname').min(2).max(255).required(),
  last_name: lettersOnly('Lastname').min(2).max(255).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .max(254)
    .label('Email'),
  password: Joi.string().min(8).max(65).required().label('Password'),
} as User
