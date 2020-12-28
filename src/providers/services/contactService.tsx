import Contact from 'models/contact'
import { ContactProps } from 'providers/contexts/contactContext'
import React, { useEffect, useState } from 'react'
import http from 'utils/http'

const useContactService = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

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

  const searchContacts = (query: string) => {
    return contacts.filter(
      (contact) =>
        contact.first_name.includes(query) ||
        contact.last_name.includes(query) ||
        contact.phone_number.includes(query)
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
        console.log(error)
      })
  }

  return {
    state: [contacts, setContacts],
    getContacts,
    searchContacts,
    updateFavorite,
  } as ContactProps
}

export default useContactService
