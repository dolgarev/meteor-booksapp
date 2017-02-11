import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { UserPresence } from 'meteor/konecty:user-presence'
import SimpleSchema from 'simpl-schema'

Meteor.startup(() => {
  Accounts.onLogout(() => FlowRouter.go('/accounts'))

  // Time of inactivity to set user as away automaticly. Default 60000
  UserPresence.awayTime = 300000

  // Set user as away when window loses focus. Defaults false
  UserPresence.awayOnWindowBlur = true

  // Start monitor for user activity
  UserPresence.start()

  if (Meteor.isDevelopment) {
    SimpleSchema.debug = true
  }
})
