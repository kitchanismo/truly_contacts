import AuthContext, { AuthProps } from 'providers/contexts/authContext'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Label, Menu, MenuItemProps } from 'semantic-ui-react'
import { nameCapitalize } from 'utils/helper'
import styles from './index.module.css'

const Nav: React.FC = () => {
  const history = useHistory()

  const {
    onSignout,
    onSignoutAll,
    currentUsername,
  } = React.useContext<AuthProps>(AuthContext)

  const [activeItem, setActiveItem] = React.useState<string | undefined>()

  React.useEffect(() => {
    setActiveItem(history.location.pathname.substring(1))
  }, [])

  const handleItemClick = (e: any, input: MenuItemProps) => {
    setActiveItem(input.name)
    history.replace('/' + input.name)
  }

  const renderMenus = () => {
    if (currentUsername)
      return (
        <>
          <Menu.Menu position='right'>
            <Menu.Item
              className={styles.nav}
              name='contacts'
              active={activeItem === 'contacts'}
              onClick={handleItemClick}
            >
              Contacts
            </Menu.Item>
            <Menu.Item className={styles.nav}>
              {nameCapitalize(currentUsername)}
            </Menu.Item>
            <Menu.Item
              className={styles.nav}
              position='right'
              name='logout'
              active={activeItem === 'logout'}
              onClick={async () => {
                if (await onSignout()) window.location.pathname = '/signin'
              }}
            >
              Logout
            </Menu.Item>
            <Menu.Item
              className={styles.nav}
              position='right'
              name='logoutall'
              active={activeItem === 'logoutall'}
              onClick={async () => {
                if (await onSignoutAll()) window.location.pathname = '/signin'
              }}
            >
              Logout All Devices
            </Menu.Item>
          </Menu.Menu>
        </>
      )

    return (
      <>
        <Menu.Item
          position='right'
          name='signin'
          className={styles.nav}
          active={activeItem === 'signin'}
          onClick={handleItemClick}
        >
          Sign In
        </Menu.Item>
        <Menu.Item
          name='signup'
          className={styles.nav}
          active={activeItem === 'signup'}
          onClick={handleItemClick}
        >
          Sign Up
        </Menu.Item>
      </>
    )
  }

  return (
    <Menu className={styles.nav} color='black' pointing secondary>
      <Menu.Item
        name='home'
        className={styles.nav}
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
