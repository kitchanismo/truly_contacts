import * as React from 'react'
import { Switch, useHistory } from 'react-router-dom'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import styles from './nav.module.css'

const Nav: React.FC = () => {
  const history = useHistory()

  const [activeItem, setActiveItem] = React.useState<string | undefined>()

  React.useEffect(() => {
    setActiveItem(nameMenu(history.location.pathname))
  }, [])

  const handleItemClick = (e: any, input: MenuItemProps) => {
    setActiveItem(input.name)
    history.push(pathName('' + input.name))
  }

  const nameMenu = (pathname: string) => {
    switch (pathname) {
      case '/home':
        return 'Truly Contacts'
      case '/signin':
        return 'Sign In'
      case '/signup':
        return 'Register'
      default:
        return ''
    }
  }
  const pathName = (name: string) => {
    switch (name) {
      case 'Truly Contacts':
        return '/home'
      case 'Sign In':
        return '/signin'
      case 'Register':
        return '/signup'
      default:
        return ''
    }
  }

  return (
    <Menu color='red' pointing secondary>
      <Menu.Item
        name='Truly Contacts'
        active={activeItem === 'Truly Contacts'}
        onClick={handleItemClick}
      />
      <Menu.Item
        position='right'
        name='Sign In'
        active={activeItem === 'Sign In'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='Register'
        active={activeItem === 'Register'}
        onClick={handleItemClick}
      />
      {/* <Menu.Item
        name='logout'
        active={activeItem === 'logout'}
        onClick={handleItemClick}
      /> */}
    </Menu>
  )
}

export default Nav
