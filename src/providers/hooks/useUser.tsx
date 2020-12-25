import * as React from 'react'
import User from 'models/user'
import http from 'utils/http'
import { UserProps } from 'providers/contexts/userContext'
import { getDecodeToken } from 'utils/helper'

const useUser = () => {
  const state = React.useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const onRegister = (user: User) => {
    return http
      .post('/auth/register', user)
      .then((data) => data.status)
      .catch((error) => error.response.status)
  }
  const onSignin = (user: User) => {
    return http
      .post('/auth/login', user)
      .then((data) => {
        localStorage.setItem('access-token', data.data.token)
        return data.status
      })
      .catch((error) => error.response.status)
  }

  const isUserAuthenticated = () => (getDecodeToken() ? true : false)

  return { isUserAuthenticated, onRegister, onSignin, state } as UserProps
}

export default useUser
