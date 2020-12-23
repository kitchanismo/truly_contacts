import * as React from 'react'
import User from 'models/user'
import http from 'utils/httpService'
import { UserProps } from 'contexts/userContext'

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
      .then((data) => {
        //to save in localStorage
        console.log(data.data.token)
        return data.status
      })
      .catch((error) => error.response.status)
  }

  return { doRegister, doSignin, user, setUser } as UserProps
}

export default useUser
