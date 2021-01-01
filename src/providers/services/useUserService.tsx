import * as React from 'react'
import User from 'models/user'
import http from 'utils/http'
import { UserProps } from 'providers/contexts/userContext'
import { getDecodeToken } from 'utils/helper'

const useUserService = () => {
  const [user, setUser] = React.useState<User>({
    username: 'kitchan',
    first_name: 'ddsd',
    last_name: 'dsd',
    email: 'chan@gmail.com',
    password: 'admin123',
  })

  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState<boolean>(
    getDecodeToken() ? true : false,
  )

  const onRegister = (user: User) => {
    return http.post('/auth/register', user).then((data) => data.status)
  }
  const onSignin = (user: User) => {
    return http.post('/auth/login', user).then((data) => {
      localStorage.setItem('access-token', data.data.token)
      setIsUserAuthenticated(true)
      return data.status
    })
  }

  const onSignout = () => {
    localStorage.removeItem('access-token')
    setIsUserAuthenticated(false)
  }

  const currentUser = () => {
    return getDecodeToken().data.username as string
  }

  return {
    currentUser,
    onSignout,
    isUserAuthenticated,
    onRegister,
    onSignin,
    user,
    setUser,
  } as UserProps
}

export default useUserService
