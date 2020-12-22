import * as React from 'react'
import { Form, Button, Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signin.module.css'
import globalStyles from 'styles.module.css'

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Sign In
          </Label>
          <Form className={globalStyles.formContainer}>
            <Form.Field>
              <label>Username</label>
              <input name='username' type='text' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name='password' type='password' />
            </Form.Field>
            <Button color='black' type='submit'>
              Submit
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SignIn
