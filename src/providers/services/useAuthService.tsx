import * as React from 'react'
import User from 'models/user'
import http from 'utils/http'
import { AuthProps } from 'providers/contexts/authContext'
import { getDecodeToken } from 'utils/helper'

const useAuthService = () => {
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
      localStorage.setItem('access-token', data.data.accessToken)
      localStorage.setItem('refresh-token', data.data.refreshToken)
      setIsUserAuthenticated(true)
      return data.status
    })
  }

  const onSignout = () => {
    return http
      .post('/auth/signout', {
        refreshToken: localStorage.getItem('refresh-token'),
      })
      .then((data) => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        setIsUserAuthenticated(false)
        return data.data.affected
      })
  }

  const onSignoutAll = () => {
    return http.get('/auth/signout-all').then((data) => {
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      setIsUserAuthenticated(false)
      return data.data.affected
    })
  }

  const currentUser = () => {
    return getDecodeToken().data.username as string
  }

  return {
    currentUser,
    onSignout,
    onSignoutAll,
    isUserAuthenticated,
    onRegister,
    onSignin,
    user,
    setUser,
  } as AuthProps
}

export default useAuthService
