import * as React from 'react'
import Context from './context'
import useUser from './hooks/useUser'

const Provider: React.FC = (props) => {
  const user = useUser()

  return (
    <Context.Provider value={{ ...user }}>{props.children}</Context.Provider>
  )
}

export default Provider
