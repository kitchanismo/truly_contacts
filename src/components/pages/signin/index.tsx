import * as React from 'react'
import { Form, Button, Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signin.module.css'
import globalStyles from 'styles.module.css'
import UserContext, { UserProps } from 'contexts/userContext'

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const { user, setUser, doSignin } = React.useContext<UserProps>(UserContext)

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setUser({
      ...user,
      [name]: value,
    })
  }

  const doSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisable(true)
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
    setIsDisable(false)
  }

  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Sign In
          </Label>
          <Form onSubmit={doSubmit} className={globalStyles.formContainer}>
            <Form.Field>
              <label>Username</label>
              <input
                name='username'
                type='text'
                value={user.username}
                onChange={doChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name='password'
                type='password'
                value={user.password}
                onChange={doChange}
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

export default SignIn
