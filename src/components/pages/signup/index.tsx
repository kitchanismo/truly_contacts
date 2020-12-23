import * as React from 'react'
import { Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signup.module.css'
import Context, { UserProps } from 'contexts/userContext'
import MyForm, { MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import Joi from 'joi'

const SignUp: React.FC = () => {
  const { user, setUser, doRegister } = React.useContext<UserProps>(Context)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const status = await doRegister(user)
      if (status === 201) {
        alert('Registered!')
      } else if (status === 400) {
        alert('Invalid Credentials')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formProps: MyFormProps<User> = {
    state: {
      data: user,
      setData: setUser,
    },
    schema: {
      username: Joi.string().alphanum().min(3).max(30).required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string().min(6).required(),
    },
    onSubmit,
  }

  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Register
          </Label>
          <MyForm {...formProps}>
            {({ myInput, myButton }) => (
              <>
                {myInput?.call(null, {
                  value: user.username,
                  name: 'username',
                  label: 'Username',
                })}
                {myInput?.call(null, {
                  value: user.first_name,
                  name: 'first_name',
                  label: 'Firstname',
                })}
                {myInput?.call(null, {
                  value: user.last_name,
                  name: 'last_name',
                  label: 'Lastname',
                })}
                {myInput?.call(null, {
                  value: user.email || '',
                  name: 'email',
                  label: 'Email',
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

export default SignUp
