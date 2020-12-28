import Contact from 'models/contact'
import ContactContext, { ContactProps } from 'providers/contexts/contactContext'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
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
  Label,
} from 'semantic-ui-react'
import { nameCapitalize } from 'utils/helper'
import styles from './index.module.css'

const Dashboard: React.FC = () => {
  const {
    getContacts,
    searchContacts,
    updateFavorite,
    contacts,
  } = React.useContext<ContactProps>(ContactContext)

  const history = useHistory()

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

  const onToggleFavorite = (contact: Contact) => {
    updateFavorite(contact)

    const _list = list.map((item) => {
      if (item.id === contact.id) {
        item.is_favorite = contact.is_favorite
      }
      return item
    })
    setList(_list)
  }

  const favoriteIcon = (contact: Contact) => {
    const name = contact.is_favorite ? 'heart' : 'heart outline'
    return (
      <Button.Group>
        <Button onClick={() => onToggleFavorite(contact)} basic icon>
          <Icon color='red' name={name}></Icon>
        </Button>
      </Button.Group>
    )
  }

  const tableRows = () => {
    return (
      <>
        {list.map((contact) => (
          <Table.Row key={contact.id.toString()}>
            <Table.Cell textAlign='center'>
              <Image src={contact.contact_picture} rounded size='mini' />
            </Table.Cell>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  {`${nameCapitalize(
                    contact.last_name.toString()
                  )}, ${nameCapitalize(contact.first_name.toString())}`}
                  <Header.Subheader>{contact.phone_number}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Flag name={contact.country_code as FlagNameValues}></Flag>
            </Table.Cell>
            <Table.Cell textAlign='center'>{favoriteIcon(contact)}</Table.Cell>
            <Table.Cell textAlign='center'>
              <Button.Group>
                <Button basic icon>
                  <Icon name='eye' color='blue' />
                </Button>
                <Button
                  onClick={() => {
                    history.push('/contacts/' + contact.id)
                  }}
                  basic
                  icon
                >
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
      <Label as='a' color='purple' size='large' ribbon>
        Contact List
      </Label>
      <Grid.Row className={styles.addSearch}>
        <span style={{ width: 300 }}>
          <Input
            fluid
            size='small'
            onChange={(e) => setQuery(e.currentTarget.value)}
            value={query}
            placeholder='Search name or number here...'
          />
        </span>
        <span>
          <Button
            onClick={() => setList(contacts)}
            content='Refresh'
            icon='refresh'
            labelPosition='left'
          />
          <Button
            color='green'
            content='Add New'
            icon='add'
            labelPosition='left'
          />
        </span>
      </Grid.Row>
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
