import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import winston from 'winston'
import { MongoDB } from 'winston-mongodb'

const opts = {
  db: process.env.MONGO_URL
}

if (Meteor.isProduction) {
  _.extend(opts, {
    handleExceptions: true,
    humanReadableUnhandledException: true
  })
}

export const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.MongoDB)(opts)
  ]
})

if (Meteor.isDevelopment) {
  logger.add(winston.transports.Console)
}
