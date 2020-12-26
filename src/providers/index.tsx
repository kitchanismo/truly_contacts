import * as React from 'react'
import UserContext from './contexts/userContext'
import useUserService from './services/useUserService'

const Provider: React.FC = (props) => {
  const userService = useUserService()

  return (
    <UserContext.Provider value={{ ...userService }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Provider
