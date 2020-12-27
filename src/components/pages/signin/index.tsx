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

  const onSubmit = () => {
    return onSignin(user)
      .then((status) => {
        if (status === 200) {
          setUser({} as User)
          history.replace('/')
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //Invalid Credentials
          throw Error(error.response.data.detail)
        }
        throw error
      })
  }

  const formProps: MyFormProps<User> = {
    state,
    validator,
    onSubmit,
    loadingMessage: 'Validating...',
  }

  return (
    <Grid.Column className={styles.container}>
      <Segment raised>
        <Label as='a' color='purple' size='large' ribbon>
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
