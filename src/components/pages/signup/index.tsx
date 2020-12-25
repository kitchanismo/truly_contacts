import * as React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import Context, { UserProps } from 'providers/contexts/userContext'
import MyForm, { InputProps, MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import validator from './validator'
import styles from './signup.module.css'

const SignUp: React.FC = () => {
  const { state, onRegister } = React.useContext<UserProps>(Context)

  const [user, setUser] = state

  const onSubmit = async () => {
    try {
      const status = await onRegister(user)
      if (status === 201) {
        alert('Registered!')
        setUser({} as User)
      } else if (status === 400) {
        alert('Invalid Credentials')
      }
    } catch (error) {
      alert('Network Error!')
    }
  }

  const formProps: MyFormProps<User> = {
    state,
    validator,
    onSubmit,
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
        <Label as='a' color='red' size='large' ribbon>
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
