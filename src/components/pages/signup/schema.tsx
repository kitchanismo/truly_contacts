import Joi from 'joi'

export default {
  username: Joi.string()
    .alphanum()
    .min(1)
    .max(150)
    .required()
    .label('Username'),
  first_name: Joi.string().min(2).max(255).required().label('Firstname'),
  last_name: Joi.string().min(2).max(255).required().label('Lastname'),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .max(254)
    .label('Email'),
  password: Joi.string().min(8).max(65).required().label('Password'),
}
