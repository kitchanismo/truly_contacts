import * as React from 'react'
import {
  Form,
  Button,
  Grid,
  Segment,
  Label,
  FormProps,
} from 'semantic-ui-react'
import styles from './signup.module.css'
import globalStyles from 'styles.module.css'
import Context, { UserProps } from 'providers/context'
import User from 'models/user'

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const { user, setUser, doRegister } = React.useContext<UserProps>(Context)
  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const doSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisable(true)
    try {
      const status = await doRegister(user)
      if (status === 201) {
        alert('Successfully Register!')
      }
    } catch (error) {
      console.log(error)
    }
    setIsDisable(false)
  }

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Register
          </Label>
          <Form onSubmit={doSubmit} className={globalStyles.formContainer}>
            <Form.Field>
              <label>Username</label>
              <input
                name='username'
                type='text'
                onChange={doChange}
                value={user?.username}
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input
                name='first_name'
                type='text'
                onChange={doChange}
                value={user?.first_name}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                name='last_name'
                type='text'
                onChange={doChange}
                value={user?.last_name}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                name='email'
                type='email'
                onChange={doChange}
                value={user?.email}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name='password'
                type='password'
                onChange={doChange}
                value={user?.password}
              />
            </Form.Field>
            <Button disabled={isDisable} color='black' type='submit'>
              {isDisable ? 'Submiting...' : 'Submit'}
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SignUp
