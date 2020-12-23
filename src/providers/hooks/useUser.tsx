import * as React from 'react'
import User from 'models/user'
import http from 'utils/httpService'

const useUser = () => {
  const [user, setUser] = React.useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const doRegister = (user: User) => {
    return http
      .post('/auth/register', user)
      .then((data) => data.status)
      .catch((error) => error.response.status)
  }
  const doSignin = (user: User) => {
    return http
      .post('/auth/login', user)
      .then((data) => data.status)
      .catch((error) => error.response.status)
  }

  return { doRegister, doSignin, user, setUser }
}

export default useUser
