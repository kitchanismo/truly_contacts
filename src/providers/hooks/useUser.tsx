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
    http.post('/auth/register', user).then((data) => console.log(data))
  }
  const doSignin = (user: User) => {
    http.post('/auth/login', user).then((data) => console.log(data.data))
  }

  return { doRegister, doSignin, user, setUser }
}

export default useUser
