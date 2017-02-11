import { Meteor } from 'meteor/meteor'
import { Avatar } from 'meteor/utilities:avatar'

Meteor.startup(() => {
  Avatar.setOptions({
    fallbackType: 'initials',
    cssClassPrefix: 'ava'
  })
})
