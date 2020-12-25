import * as React from 'react'
import UserContext from './contexts/userContext'
import useUser from './hooks/useUser'

const Provider: React.FC = (props) => {
  const userProps = useUser()

  return (
    <UserContext.Provider value={{ ...userProps }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default Provider
