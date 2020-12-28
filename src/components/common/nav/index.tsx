import UserContext, { UserProps } from 'providers/contexts/userContext'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Label, Menu, MenuItemProps } from 'semantic-ui-react'
import { nameCapitalize } from 'utils/helper'

const Nav: React.FC = () => {
  const history = useHistory()

  const {
    isUserAuthenticated,
    onSignout,
    currentUser,
  } = React.useContext<UserProps>(UserContext)

  const [activeItem, setActiveItem] = React.useState<string | undefined>()

  React.useEffect(() => {
    setActiveItem(history.location.pathname.substring(1))
  }, [])

  const handleItemClick = (e: any, input: MenuItemProps) => {
    setActiveItem(input.name)
    history.push('/' + input.name)
  }

  const renderMenus = () => {
    if (isUserAuthenticated)
      return (
        <>
          <Menu.Menu position='right'>
            <Menu.Item
              color='purple'
              name='contacts'
              active={activeItem === 'contacts'}
              onClick={handleItemClick}
            >
              Contacts
            </Menu.Item>
            <Menu.Item color='purple'>
              {nameCapitalize(currentUser())}
            </Menu.Item>
            <Menu.Item
              position='right'
              name='logout'
              active={activeItem === 'logout'}
              onClick={() => {
                onSignout()
                history.replace('/')
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        </>
      )

    return (
      <>
        <Menu.Item
          position='right'
          name='signin'
          active={activeItem === 'signin'}
          onClick={handleItemClick}
        >
          Sign In
        </Menu.Item>
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={handleItemClick}
        >
          Sign Up
        </Menu.Item>
      </>
    )
  }

  return (
    <Menu color='purple' pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>
      {renderMenus()}
    </Menu>
  )
}

export default Nav
