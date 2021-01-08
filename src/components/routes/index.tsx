import { Route, Redirect, Switch } from 'react-router-dom'

//can only be access when user is sigiin
import AuthRoute from './auth'
//can only be access when user is signout
import GuestRoute from './guest'

import SignIn from 'components/pages/signin'
import SignUp from 'components/pages/signup'
import Home from 'components/pages/home'
import Contact from 'components/pages/contacts'
import EditContact from 'components/pages/contacts/edit/edit'
import NewContact from 'components/pages/contacts/new/new'
import NotFound from 'components/pages/notFound'

const Routes = () => {
  return (
    <Switch>
      <AuthRoute path='/contacts/new' component={NewContact} />
      <AuthRoute path='/contacts/:id' component={EditContact} />
      <AuthRoute path='/contacts' component={Contact} />
      <GuestRoute path='/signup' component={SignUp} />
      <GuestRoute path='/signin' component={SignIn} />
      <Route path='/home' component={Home} />
      <Route path='/not-found' component={NotFound} />
      <Redirect from='/' exact to='/contacts' />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default Routes
