import ContactContext, { ContactProps } from 'providers/contexts/contactContext'
import * as React from 'react'
import {
  Grid,
  Header,
  Table,
  Image,
  Icon,
  Flag,
  FlagNameValues,
  Button,
  Input,
} from 'semantic-ui-react'
import { nameCapitalize } from 'utils/helper'
import styles from './contacts.module.css'

const Dashboard: React.FC = () => {
  const {
    getContacts,
    state: [contacts],
  } = React.useContext<ContactProps>(ContactContext)

  React.useEffect(() => {
    getContacts()
  }, [])

  const tableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Photo</Table.HeaderCell>
          <Table.HeaderCell>Name / Number</Table.HeaderCell>
          <Table.HeaderCell>Country</Table.HeaderCell>
          <Table.HeaderCell>Favorite</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  const favoriteIcon = (isFavorite: boolean) => {
    const name = isFavorite ? 'heart' : 'heart outline'
    return <Icon color='red' name={name}></Icon>
  }

  const tableRows = () => {
    return (
      <>
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <Table.Row key={contact.id}>
              <Table.Cell textAlign='center'>
                <Image src={contact.contact_picture} rounded size='mini' />
              </Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Header.Content>
                    {`${nameCapitalize(contact.last_name)}, ${nameCapitalize(
                      contact.first_name
                    )}`}
                    <Header.Subheader>{contact.phone_number}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Flag name={contact.country_code as FlagNameValues}></Flag>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {favoriteIcon(contact.is_favorite)}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button.Group>
                  <Button basic icon>
                    <Icon name='eye' color='blue' />
                  </Button>
                  <Button basic icon>
                    <Icon name='pencil' color='yellow' />
                  </Button>
                  <Button basic icon>
                    <Icon name='trash' color='red' />
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
      </>
    )
  }
  return (
    <Grid.Column className={styles.container}>
      <Grid.Row className={styles.addSearch}>
        <Input placeholder='Search...' />
        <Button color='green' content='Add' icon='add' labelPosition='left' />
      </Grid.Row>

      <Table textAlign='center' className={styles.table} basic='very' celled>
        {tableHeader()}
        <Table.Body className={styles.body}>{tableRows()}</Table.Body>
      </Table>
    </Grid.Column>
  )
}

export default Dashboard
