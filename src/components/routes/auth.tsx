import NotFound from 'components/pages/notFound'
import SignIn from 'components/pages/signin'
import UserContext, { UserProps } from 'providers/contexts/userContext'
import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const AuthRoute: React.FC<RouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const { isUserAuthenticated } = useContext<UserProps>(UserContext)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isUserAuthenticated)
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
        return Component ? <Component {...props} /> : render?.call(null, props)
      }}
    />
  )
}

export default AuthRoute
