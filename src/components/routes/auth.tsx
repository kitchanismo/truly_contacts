import NotFound from 'components/pages/notFound'
import SignIn from 'components/pages/signin'
import AuthContext, { AuthProps } from 'providers/contexts/authContext'
import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const AuthRoute: React.FC<RouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const { currentUser } = useContext<AuthProps>(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser)
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
