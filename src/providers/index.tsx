import * as React from 'react'
import ContactContext from './contexts/contactContext'
import UserContext from './contexts/userContext'
import useContactService from './services/contactService'
import useUserService from './services/useUserService'

const Provider: React.FC = (props) => {
  const userService = useUserService()
  const contactService = useContactService()

  return (
    <UserContext.Provider value={{ ...userService }}>
      <ContactContext.Provider value={{ ...contactService }}>
        {props.children}
      </ContactContext.Provider>
    </UserContext.Provider>
  )
}

export default Provider
