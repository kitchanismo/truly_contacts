import React from 'react'
import SignIn from 'components/pages/signin'
import { Container } from 'semantic-ui-react'
import styles from 'styles.module.css'
import Nav from 'components/common/nav/index'
import Routes from 'routes'
import Provider from 'providers/index'

const App: React.FC = (props) => (
  <>
    <Provider>
      <Nav></Nav>
      <Container fluid className={styles.container}>
        <Routes></Routes>
      </Container>
    </Provider>
  </>
)

export default App
