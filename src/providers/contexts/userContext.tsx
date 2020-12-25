import User from 'models/user'
import React from 'react'

export interface UserProps {
  state: [User, React.Dispatch<React.SetStateAction<User>>]
  onRegister: (user: User) => Promise<any>
  onSignin: (user: User) => Promise<any>
  isUserAuthenticated: boolean
  onSignout: () => void
  (): UserProps
}

const UserContext = React.createContext<any>(null)

export default UserContext
