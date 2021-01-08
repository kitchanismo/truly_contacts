import NotFound from 'components/pages/notFound'
import SignIn from 'components/pages/signin'
import AuthContext, { AuthProps } from 'providers/contexts/authContext'
import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const GuestRoute: React.FC<RouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const { currentUsername } = useContext<AuthProps>(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUsername)
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        return Component ? <Component {...props} /> : render?.call(null, props)
      }}
    />
  )
}

export default GuestRoute
