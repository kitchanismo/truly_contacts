import * as React from 'react'
import { Form, Button, Grid, Segment, Label, Input } from 'semantic-ui-react'
import styles from './signin.module.css'
import globalStyles from 'styles.module.css'
import UserContext, { UserProps } from 'contexts/userContext'
import MyForm, { MyFormProps, InputProps } from 'components/common/myForm'
import User from 'models/user'

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const { user, setUser, doSignin } = React.useContext<UserProps>(UserContext)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const status = await doSignin(user)
      if (status === 200) {
        alert('Success login!')
      } else if (status === 401) {
        alert('Invalid Username/Password!')
      }
    } catch (error) {
      console.log('Network Error!')
    }
  }

  const form: MyFormProps<User> = {
    state: {
      data: user,
      setData: setUser,
    },
    onSubmit,
  }

  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Sign In
          </Label>
          <MyForm {...form}>
            {({ myInput, myButton }) => (
              <>
                {myInput?.call(null, {
                  value: user.username,
                  name: 'username',
                  label: 'Username',
                })}
                {myInput?.call(null, {
                  value: user.password,
                  type: 'password',
                  name: 'password',
                  label: 'Password',
                })}
                {myButton?.call(null)}
              </>
            )}
          </MyForm>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SignIn
