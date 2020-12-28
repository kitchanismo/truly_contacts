import Contact from 'models/contact'
import { ContactProps } from 'providers/contexts/contactContext'
import React, { useEffect, useState } from 'react'
import http from 'utils/http'

const useContactService = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  const [contact, setContact] = useState<Contact>({
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    country_code: '',
    contact_picture: '',
    is_favorite: false,
  })

  const getContacts = () => {
    return http
      .get<Contact[]>('/contacts/')
      .then((data) => {
        setContacts(data.data as Contact[])
        return data.data as Contact[]
      })
      .catch((error) => {
        console.log(error)
        return [] as Contact[]
      })
  }

  const getContact = (id: string) => {
    return http
      .get<Contact>('/contacts/' + id)
      .then((data) => {
        setContact(data.data as Contact)
        return data.data as Contact
      })
      .catch((error) => {
        throw error
      })
  }

  const searchContacts = (query: string) => {
    return contacts.filter(
      (contact) =>
        contact.first_name.toString().includes(query) ||
        contact.last_name.toString().includes(query) ||
        contact.phone_number.toString().includes(query)
    )
  }

  const updateFavorite = (contact: Contact) => {
    contact.is_favorite = !contact.is_favorite
    return http
      .put('/contacts/' + contact.id, contact)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        throw error
      })
  }

  return {
    contacts,
    setContacts,
    contact,
    setContact,
    getContact,
    getContacts,
    searchContacts,
    updateFavorite,
  } as ContactProps
}

export default useContactService
