import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { Migrations } from 'meteor/percolate:migrations'
import { Slingshot } from 'meteor/edgee:slingshot'
import { UserPresence, UserPresenceMonitor } from 'meteor/konecty:user-presence'

Meteor.startup(() => {
  Migrations.migrateTo('latest')

  // Listen for new connections, login, logoff and application exit to manage user status and register methods to be used by client to set user status and default status
  UserPresence.start()

  // Listen for changes in UserSessions and Meteor.users to set user status based on active connections
  UserPresenceMonitor.start()

  if (Meteor.settings.enableSlingshot) {
    // Cover slingshot directive
    const bookCoverUploadDirectiveParams = {
      acl: 'public-read',
      authorize (file, metaContext) {
        return _.isString(this.userId)
      },
      key (file, metaContext) {
        const currentUserId = this.userId
        const now = Date.now()

        return `files/book_covers/${currentUserId}/${file.name}-${now}`
      }
    }

    if (_.isString(Meteor.settings.AWSCDN)) {
      bookCoverUploadDirectiveParams.cdn = Meteor.settings.AWSCDN
    }

    Slingshot.createDirective('bookCoverUploads', Slingshot.S3Storage, bookCoverUploadDirectiveParams)
  }
})
