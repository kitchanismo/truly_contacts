import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import styles from 'styles.module.css'

import Nav from 'components/common/nav'
import Routes from 'routes'
import Provider from 'providers'

const App: React.FC = (props) => (
  <>
    <Provider>
      <Nav></Nav>
      <Container fluid>
        <Grid verticalAlign='top' centered className={styles.container}>
          <Routes></Routes>
        </Grid>
      </Container>
    </Provider>
  </>
)

export default App
