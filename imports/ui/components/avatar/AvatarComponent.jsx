import React from 'react'
import Blaze from 'meteor/gadicc:blaze-react-component'

const AvatarComponent = ({ currentUser }) => {
  return (
    <div>
      <Blaze template='avatar' user={currentUser} shape='circle' size='small' />
    </div>
  )
}

export default AvatarComponent
