import User from 'models/user'
import React from 'react'

export interface UserProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  doRegister: (user: User) => Promise<any>
  doSignin: (user: User) => Promise<any>
  (): UserProps
}

const UserContext = React.createContext<any>(null)

export default UserContext
