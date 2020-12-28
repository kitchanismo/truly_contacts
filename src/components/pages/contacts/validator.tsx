import Joi from 'joi'
import Contact from 'models/contact'
import { lettersOnly } from 'utils/helper'

export default {
  id: Joi.optional(),
  first_name: lettersOnly('First Name').min(1).max(30).required(),
  last_name: lettersOnly('Last Name').min(1).max(30).required(),
  phone_number: Joi.string().min(1).max(30).required().label('Phone Number'),
  country_code: Joi.string().min(1).max(30).required().label('Country Code'),
  contact_picture: Joi.string()
    .min(1)
    .max(200)
    .required()
    .label('Contact Picture'),
  is_favorite: Joi.boolean().required().label('Favorite'),
} as Contact
