import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { RestrictMixin } from 'meteor/ziarno:restrict-mixin'

import prettyHrtime from 'pretty-hrtime'
import { logger } from '../startup/server/logger.js'

export const isLoggedInMixin = RestrictMixin.createMixin({
  condition (args) {
    return !this.userId
  },
  error (args) {
    return new Meteor.Error('user-not-loggedin')
  }
})

// [https://github.com/themeteorchef/server-only-methods]
export const isOnlineMixin = RestrictMixin.createMixin({
  condition (args) {
    return this.connection == null && Meteor.status().connected === false
  },
  error (args) {
    return new Meteor.Error('forbidden-in-offline')
  }
})

function _locallyInvokeMethod (object, params = {}, invokeContext = {}) {
  _.defaults(invokeContext, {
    userId: this.userId,
    connection: this.connection
  })

  return object._execute(invokeContext, params)
};

export const loggerMixin = function (methodOptions) {
  methodOptions.run = _.wrap(methodOptions.run, function (originalRun, ...args) {
    if (this.isSimulation) {
      return originalRun.apply(this, args)
    }

    let res

    // [https://www.npmjs.com/package/morgan]
    try {
      logger.info(this.name, {
        logEntry: `${this.connection.clientAddress} - ${this.userId} ${this.name}`,
        userId: this.userId,
        args: args,
        clientAddress: this.connection.clientAddress,
        httpHeaders: this.connection.httpHeaders
      })

      this._locallyInvokeMethod = _locallyInvokeMethod

      let startPoint = process.hrtime()
      res = originalRun.apply(this, args)
      let endPoint = process.hrtime(startPoint)

      logger.info(this.name, {
        userId: this.userId,
        result: res,
        elapsedTime: prettyHrtime(endPoint)
      })
    } catch (err) {
      logger.error(this.name, {
        userId: this.userId,
        args: args,
        clientAddress: this.connection.clientAddress,
        httpHeaders: this.connection.httpHeaders
      })
      throw err
    }

    return res
  })

  return methodOptions
}
