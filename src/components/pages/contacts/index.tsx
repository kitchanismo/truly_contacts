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
    deleteContact,
    setContacts,
    contacts,
  } = React.useContext<ContactProps>(ContactContext)

  const history = useHistory()

  const [query, setQuery] = React.useState<string>('')

  const [list, setList] = React.useState<Contact[]>(contacts)

  React.useEffect(() => {
    onReload()
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
          <Icon color='purple' name={name}></Icon>
        </Button>
      </Button.Group>
    )
  }

  const onReload = () => {
    getContacts().then((contacts) => {
      setList(contacts)
    })
  }

  const tableRows = () => {
    return (
      <>
        {list.map((contact) => (
          <Table.Row key={contact.id.toString()}>
            <Table.Cell textAlign='center'>
              <Image
                centered
                src={contact.contact_picture}
                rounded
                size='mini'
              />
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
                <Button
                  onClick={() => {
                    history.push('/contacts/' + contact.id)
                  }}
                  basic
                  icon
                >
                  <Icon name='pencil' color='yellow' />
                </Button>
                <Button
                  onClick={() => {
                    deleteContact(+contact.id).then(() => onReload())
                  }}
                  basic
                  icon
                >
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
      <Label as='a' color='black' size='large' ribbon>
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
          <Button onClick={onReload} icon='refresh' />
          <Button
            onClick={() => history.push('/contacts/new')}
            color='purple'
            icon='add'
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
