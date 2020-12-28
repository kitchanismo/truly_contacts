import Joi from 'joi'
import User from 'models/user'
import React from 'react'

export interface UserProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  onRegister: (user: User) => Promise<any>
  onSignin: (user: User) => Promise<any>
  isUserAuthenticated: boolean
  onSignout: () => void
  currentUser: () => string
  (): UserProps
}

const UserContext = React.createContext<any>(null)

export default UserContext
