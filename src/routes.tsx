import { Route, Redirect, Switch } from 'react-router-dom'

import SignIn from 'components/pages/signin/index'
import SignUp from 'components/pages/signup/index'
import Home from 'components/pages/home/index'

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
