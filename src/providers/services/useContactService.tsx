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

  const addContact = (contact: Contact) => {
    return http
      .post<Contact>('/contacts/', contact)
      .then((data) => {
        return data.data as Contact
      })
      .catch((error) => {
        throw error
      })
  }

  const deleteContact = (id: number) => {
    const _temp = contacts
    const _contacts = contacts.filter((contact) => contact.id != id)
    setContacts(_contacts)
    return http
      .delete<Contact>('/contacts/' + id)
      .then((data) => {
        return data.data as Contact
      })
      .catch((error) => {
        setContacts(_temp)
        throw error
      })
  }

  const updateContact = (contact: Contact) => {
    return http
      .put<Contact>('/contacts/' + contact.id, contact)
      .then((data) => {
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
        contact.phone_number.toString().includes(query),
    )
  }

  const updateFavorite = (contact: Contact) => {
    contact.is_favorite = !contact.is_favorite
    return http
      .put('/contacts/' + contact.id, contact)
      .then((data) => {})
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
    addContact,
    searchContacts,
    updateFavorite,
    updateContact,
    deleteContact,
  } as ContactProps
}

export default useContactService
