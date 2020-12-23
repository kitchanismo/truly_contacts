import { Route, Redirect, Switch } from 'react-router-dom'

import SignIn from 'components/pages/signin'
import SignUp from 'components/pages/signup'
import Home from 'components/pages/home'

const Routes = () => {
  return (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/home' component={Home} />
      <Redirect from='/' exact to='/home' />
    </Switch>
  )
}

export default Routes
