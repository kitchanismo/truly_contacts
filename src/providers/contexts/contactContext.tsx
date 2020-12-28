import Joi from 'joi'
import Contact from 'models/contact'
import React from 'react'

export interface ContactProps {
  contacts: Contact[]
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
  contact: Contact
  setContact: React.Dispatch<React.SetStateAction<Contact>>
  getContacts: () => Promise<Contact[]>
  addContact: (contact: Contact) => Promise<Contact>
  getContact: (id: string) => Promise<Contact>
  searchContacts: (query: string) => Contact[]
  updateFavorite: (contact: Contact) => Promise<void>
  updateContact: (contact: Contact) => Promise<Contact>
  deleteContact: (id: number) => Promise<Contact>
  (): ContactProps
}

const ContactContext = React.createContext<any>(null)

export default ContactContext
