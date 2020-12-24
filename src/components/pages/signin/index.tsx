import * as React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signin.module.css'
import UserContext, { UserProps } from 'contexts/userContext'
import MyForm, { MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import schema from './schema'

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const { state, doSignin } = React.useContext<UserProps>(UserContext)

  const [user, setUser] = state

  const { username, password } = user

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

  const formProps: MyFormProps<User> = {
    state,
    schema,
    onSubmit,
  }

  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Sign In
          </Label>
          <MyForm {...formProps}>
            {({ myInput, myButton }) => (
              <>
                {myInput?.call(null, {
                  value: username,
                  name: 'username',
                  label: 'Username',
                })}
                {myInput?.call(null, {
                  value: password,
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
