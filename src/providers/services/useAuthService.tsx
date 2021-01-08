import * as React from 'react'
import User from 'models/user'
import http from 'utils/http'
import { AuthProps } from 'providers/contexts/authContext'

const useAuthService = () => {
  const [user, setUser] = React.useState<User>({
    username: 'kitchan',
    first_name: 'ddsd',
    last_name: 'dsd',
    email: 'chan@gmail.com',
    password: 'admin123',
  })

  const [currentUsername, setCurrentUsername] = React.useState<string>('')

  React.useEffect(() => {
    isUserAuthenticated()
  }, [])

  const isUserAuthenticated = () => {
    return http.get('/auth/me').then((data) => {
      setCurrentUsername(data.data.username)
    })
  }

  const onRegister = (user: User) => {
    return http.post('/auth/register', user).then((data) => data.status)
  }
  const onSignin = (user: User) => {
    return http.post('/auth/login', user).then((data) => {
      return data.status
    })
  }

  const onSignout = () => {
    return http.get('/auth/signout').then((data) => {
      return data.data.affected
    })
  }

  const onSignoutAll = () => {
    return http.get('/auth/signout-all').then((data) => {
      return data.data.affected
    })
  }

  return {
    currentUsername,
    onSignout,
    onSignoutAll,
    onRegister,
    onSignin,
    user,
    setUser,
  } as AuthProps
}

export default useAuthService
