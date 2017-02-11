import { Message } from 'semantic-ui-react'

export const MessageSuccess = ({ children }) => (
  <Message positive size='large'>
    <p>{children}</p>
  </Message>
)

export const MessageFailure = ({ children }) => (
  <Message negative size='large'>
    <p>{children}</p>
  </Message>
)
