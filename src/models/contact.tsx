import Joi from 'joi'

interface Contact {
  id: number | Joi.Schema
  first_name: string | Joi.StringSchema
  last_name: string | Joi.StringSchema
  country_code: string | Joi.StringSchema
  phone_number: string | Joi.StringSchema
  contact_picture?: string | Joi.StringSchema
  is_favorite: boolean | Joi.BooleanSchema
}

export default Contact
