import Joi from 'joi'
import User from 'models/user'
import React from 'react'

export interface AuthProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  onRegister: (user: User) => Promise<any>
  onSignin: (user: User) => Promise<any>
  isUserAuthenticated: boolean
  onSignout: () => void
  currentUser: () => string
  (): AuthProps
}

const AuthContext = React.createContext<any>(null)

export default AuthContext
