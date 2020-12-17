import React from 'react'
import {Route, Switch} from 'react-router-dom'

//ui components
import {ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import theme from './theme'

//custom components
import Home from './pages/home'
import SignUp from './pages/auth/signup'
import SignIn from './pages/auth/signin'

const App = () => {
return <ThemeProvider theme={theme}>  
            <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Switch>
                    <Route path='/signup' component={SignUp} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/' component={Home} />
                </Switch>
            </Grid>
            </Container>
        </ThemeProvider>
}
 
export default App;