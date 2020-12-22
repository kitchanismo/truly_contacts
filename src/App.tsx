import React from 'react'
import SignIn from 'components/pages/signin'
import { Container } from 'semantic-ui-react'
import styles from './styles.module.css'
import Nav from 'components/common/nav'
import Routes from 'routes'

const App: React.FC = (props) => (
  <>
    <Nav></Nav>
    <Container fluid className={styles.container}>
      <Routes></Routes>
    </Container>
  </>
)

export default App
