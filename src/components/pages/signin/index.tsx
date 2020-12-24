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

  const [user] = state

  const { username, password } = user

  async function onSubmit() {
    try {
      const status = await doSignin(user)
      if (status === 200) {
        alert('Success login!')
      } else if (status === 401) {
        alert('Invalid Username/Password!')
      }
    } catch (error) {
      alert('Network Error!')
    }
  }

  const formProps: MyFormProps<User> = {
    state,
    schema,
    onSubmit,
  }

  return (
    <Grid.Column className={styles.container}>
      <Segment raised>
        <Label as='a' color='red' size='large' ribbon>
          Sign In
        </Label>
        <MyForm {...formProps}>
          {({ myInput, myButton }) => (
            <>
              {myInput({
                value: username,
                name: 'username',
                label: 'Username',
              })}
              {myInput({
                value: password,
                type: 'password',
                name: 'password',
                label: 'Password',
              })}
              {myButton()}
            </>
          )}
        </MyForm>
      </Segment>
    </Grid.Column>
  )
}

export default SignIn
