import Contact from 'models/contact'
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
  Form,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import { nameCapitalize } from 'utils/helper'
import styles from './contacts.module.css'

const Dashboard: React.FC = () => {
  const {
    getContacts,
    searchContacts,
    state: [contacts],
  } = React.useContext<ContactProps>(ContactContext)

  const [query, setQuery] = React.useState<string>('')

  const [list, setList] = React.useState<Contact[]>([])

  React.useEffect(() => {
    getContacts().then((contacts) => {
      setList(contacts)
    })
  }, [])

  React.useEffect(() => {
    setList(searchContacts(query))
  }, [query])

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
        {list.map((contact) => (
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
        <Input
          size='small'
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          placeholder='Search...'
        />

        <span>
          <Button
            onClick={() => setList(contacts)}
            content='Refresh'
            icon='refresh'
            labelPosition='left'
          />
          <Button color='green' content='Add' icon='add' labelPosition='left' />
        </span>
      </Grid.Row>
      {list.length === 0 && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
      {list.length > 0 && (
        <Table textAlign='center' className={styles.table} basic='very' celled>
          {tableHeader()}
          <Table.Body className={styles.body}>{tableRows()}</Table.Body>
        </Table>
      )}
    </Grid.Column>
  )
}

export default Dashboard
