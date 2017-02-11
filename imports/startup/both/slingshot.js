import { Meteor } from 'meteor/meteor'
import { Slingshot } from 'meteor/edgee:slingshot'

if (Meteor.settings.enableSlingshot) {
  Slingshot.fileRestrictions('bookCoverUploads', {
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
    maxSize: 2 * 1024 * 1024 // 10 MB (use null for unlimited)
  })
}
