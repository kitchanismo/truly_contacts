import * as React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import Context, { UserProps } from 'providers/contexts/userContext'
import MyForm, { InputProps, MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import validator from './validator'
import styles from './index.module.css'

const SignUp: React.FC = () => {
  const { user, setUser, onRegister } = React.useContext<UserProps>(Context)

  const onSubmit = () => {
    return onRegister(user)
      .then((status) => {
        if (status === 201) {
          setUser({} as User)
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          const errorMessage = error.response.data.error.username
            ? error.response.data.error.username
            : error.response.data.error.email
          throw Error(errorMessage)
        }
        throw error
      })
  }

  const formProps: MyFormProps<User> = {
    state: [user, setUser],
    onSubmit,
    validator,
    resolveMessage: 'You may now signin...',
  }

  const inputProps: InputProps[] = [
    {
      value: user.username,
      name: 'username',
      label: 'Username',
    },
    {
      value: user.first_name,
      name: 'first_name',
      label: 'Firstname',
    },
    {
      value: user.last_name,
      name: 'last_name',
      label: 'Lastname',
    },

    {
      value: user.email,
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      value: user.password,
      type: 'password',
      name: 'password',
      label: 'Password',
    },
  ]

  return (
    <Grid.Column className={styles.container}>
      <Segment raised>
        <Label as='a' color='black' size='large' ribbon>
          Register
        </Label>
        <MyForm {...formProps}>
          {({ myInput, myButton }) => (
            <>
              {inputProps.map((prop) => myInput(prop))}
              {myButton()}
            </>
          )}
        </MyForm>
      </Segment>
    </Grid.Column>
  )
}

export default SignUp
