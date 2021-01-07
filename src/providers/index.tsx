import * as React from 'react'
import ContactContext from './contexts/contactContext'
import AuthContext from './contexts/authContext'
import useContactService from './services/useContactService'
import useAuthService from './services/useAuthService'

const Provider: React.FC = (props) => {
  const authService = useAuthService()
  const contactService = useContactService()

  return (
    <AuthContext.Provider value={{ ...authService }}>
      <ContactContext.Provider value={{ ...contactService }}>
        {props.children}
      </ContactContext.Provider>
    </AuthContext.Provider>
  )
}

export default Provider
