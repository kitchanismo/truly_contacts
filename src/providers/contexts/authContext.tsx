import Joi from 'joi'
import User from 'models/user'
import React from 'react'

export interface AuthProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  onRegister: (user: User) => Promise<any>
  onSignin: (user: User) => Promise<any>
  onSignout: () => Promise<any>
  onSignoutAll: () => Promise<any>
  currentUser: { username: string; id: number } | null
  (): AuthProps
}

const AuthContext = React.createContext<any>(null)

export default AuthContext
