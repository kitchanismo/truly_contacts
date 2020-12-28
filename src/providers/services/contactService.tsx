import Contact from 'models/contact'
import { ContactProps } from 'providers/contexts/contactContext'
import React, { useEffect, useState } from 'react'
import http from 'utils/http'

const useContactService = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  const getContacts = () => {
    return http
      .get('/contacts/')
      .then((data) => {
        setContacts(data.data as Contact[])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { state: [contacts, setContacts], getContacts } as ContactProps
}

export default useContactService
