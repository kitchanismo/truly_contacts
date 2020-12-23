import * as React from 'react'
import UserContext from '../contexts/userContext'
import useUser from './hooks/useUser'

const Provider: React.FC = (props) => {
  const user = useUser()

  return (
    <UserContext.Provider value={{ ...user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Provider
