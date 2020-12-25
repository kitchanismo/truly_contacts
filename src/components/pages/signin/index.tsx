import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signin.module.css'
import UserContext, { UserProps } from 'providers/contexts/userContext'
import MyForm, { MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import validator from './validator'

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const history = useHistory()
  const { state, onSignin } = React.useContext<UserProps>(UserContext)

  const [user, setUser] = state

  const onSubmit = async () => {
    try {
      const status = await onSignin(user)
      if (status === 200) {
        alert('Success login!')
        setUser({} as User)
        history.replace('/contacts')
      } else if (status === 401) {
        alert('Invalid Username/Password!')
      }
    } catch (error) {
      alert('Network/Server Error! ')
    }
  }

  const formProps: MyFormProps<User> = {
    state,
    validator,
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
                value: user.username,
                name: 'username',
                label: 'Username',
              })}
              {myInput({
                value: user.password,
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
