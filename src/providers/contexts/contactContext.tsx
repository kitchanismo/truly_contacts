import Joi from 'joi'
import Contact from 'models/contact'
import React from 'react'

export interface ContactProps {
  state: [Contact[], React.Dispatch<React.SetStateAction<Contact[]>>]
  getContacts: () => Promise<any>
  (): ContactProps
}

const ContactContext = React.createContext<any>(null)

export default ContactContext
