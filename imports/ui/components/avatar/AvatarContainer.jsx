import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import AvatarComponent from './AvatarComponent.jsx'

const AvatarContainer = createContainer(() => ({
  currentUser: Meteor.user()
}), AvatarComponent)

export default AvatarContainer
