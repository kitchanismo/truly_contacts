import * as React from 'react'
import { Form, Button, Grid, Segment, Label } from 'semantic-ui-react'
import styles from './signup.module.css'
import globalStyles from 'styles.module.css'

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <Grid centered>
      <Grid.Column className={styles.container}>
        <Segment raised>
          <Label as='a' color='red' ribbon>
            Register
          </Label>
          <Form className={globalStyles.formContainer}>
            <Form.Field>
              <label>Username</label>
              <input name='username' type='text' />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input name='firstname' type='text' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input name='lastname' type='text' />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input name='email' type='email' />
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

export default SignUp
