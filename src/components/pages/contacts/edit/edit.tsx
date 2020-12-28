import MyForm, { MyFormProps } from 'components/common/myForm'
import Contact from 'models/contact'
import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Label, Segment } from 'semantic-ui-react'
import validator from '../validator'
import styles from './edit.module.css'
import ContactContext, { ContactProps } from 'providers/contexts/contactContext'

export interface EditContactProps {}

const EditContact: React.FC<EditContactProps> = () => {
  const { id } = useParams<{ id: string }>()

  const history = useHistory()

  const { contact, setContact, getContact } = React.useContext<ContactProps>(
    ContactContext
  )

  React.useEffect(() => {
    getContact(id)
      .then()
      .catch((error) => {
        if (error?.response?.status === 404) {
          history.push('/not-found')
        }
      })
  }, [])

  const onSubmit = () => {
    return Promise.resolve()
  }

  const formProps: MyFormProps<Contact> = {
    state: [contact, setContact],
    validator,
    onSubmit,
  }

  return (
    <Grid.Column className={styles.container}>
      <Segment raised>
        <Label as='a' color='purple' size='large' ribbon>
          Edit Contact
        </Label>
        <MyForm {...formProps}>
          {({ myInput, myButton }) => (
            <>
              {myInput({
                value: contact.first_name,
                name: 'first_name',
                label: 'First Name',
              })}
              {myInput({
                value: contact.last_name,
                name: 'last_name',
                label: 'Last Name',
              })}
              {myInput({
                value: contact.phone_number,
                name: 'phone_number',
                label: 'Phone Nuumber',
              })}
              {myInput({
                value: contact.country_code,
                name: 'country_code',
                label: 'Country Code',
              })}

              {myInput({
                value: contact.contact_picture,
                name: 'contact_picture',
                label: 'Contact Picture',
              })}

              {myButton()}
            </>
          )}
        </MyForm>
      </Segment>
    </Grid.Column>
  )
}

export default EditContact
