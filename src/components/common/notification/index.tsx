import { loadavg } from 'os'
import * as React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import {
  SemanticCOLORS,
  SemanticICONS,
} from 'semantic-ui-react/dist/commonjs/generic'

export interface NotificationProps {
  header?: string
  loading?: boolean
  icon?: SemanticICONS
  color?: SemanticCOLORS
}

const Notification: React.SFC<NotificationProps> = (props) => {
  return (
    <Message color={props.color || 'blue'} icon>
      <Icon
        name={props.icon || 'circle notched'}
        loading={props.loading || false}
      />
      <Message.Content>
        <Message.Header>{props.header || 'Just a second'}</Message.Header>
        {props.children}
      </Message.Content>
    </Message>
  )
}

export default Notification
