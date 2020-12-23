import User from 'models/user'
import React from 'react'

export interface UserProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  doRegister: (user: User) => Promise<number>
  doSignin: (user: User) => Promise<number>
}

export interface ContactProps {
  doContact: (user: User) => void
}

const Context = React.createContext<any>({})

export default Context
