import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logger } from '../../startup/server/logger.js'
import { isLoggedInMixin, loggerMixin } from '../methodMixins.js'
import Books from './books.js'
import isbn from 'isbn-utils'
import isbnResolver from 'node-isbn'

export const createBook = new ValidatedMethod({
  name: 'books.createBook',
  mixins: [isLoggedInMixin, loggerMixin],
  validate: new SimpleSchema({
    name: {
      type: String
    },
    author: {
      type: String
    },
    ISBN: {
      type: String
    },
    publishedDate: {
      type: String
    },
    coverUrl: {
      type: String,
      optional: true
    }
  }).validator(),
  run (book) {
    const newBookData = _.reduce(
      ['name', 'author', 'ISBN', 'publishedDate', 'coverUrl'],
      (memo, key) => {
        if (!_.isUndefined(book[key])) memo[key] = book[key]
        return memo
      },
      {}
    )

    newBookData.ownerId = this.userId

    const newBookId = Books.insert(newBookData)

    return newBookId
  }
})

export const updateBook = new ValidatedMethod({
  name: 'books.updateBook',
  mixins: [isLoggedInMixin, loggerMixin],
  validate: new SimpleSchema({
    bookId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    bookData: {
      type: Object
    },
    'bookData.name': {
      type: String,
      optional: true
    },
    'bookData.author': {
      type: String,
      optional: true
    },
    'bookData.ISBN': {
      type: String,
      optional: true
    },
    'bookData.publishedDate': {
      type: String,
      optional: true
    },
    'bookData.coverUrl': {
      type: String,
      optional: true
    }
  }).validator(),
  run ({ bookId, bookData }) {
    const data = _.reduce(
      ['name', 'author', 'ISBN', 'publishedDate', 'coverUrl'],
      (memo, key) => {
        if (!_.isUndefined(bookData[key])) memo[key] = bookData[key]
        return memo
      },
      {}
    )

    const affectedRows = Books.update({
      _id: bookId,
      ownerId: this.userId
    }, {
      $set: data
    })

    return affectedRows
  }
})

export const removeBook = new ValidatedMethod({
  name: 'books.removeBook',
  mixins: [isLoggedInMixin, loggerMixin],
  validate: new SimpleSchema({
    bookId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run ({ bookId }) {
    const affectedRows = Books.remove({
      _id: bookId,
      ownerId: this.userId
    })

    return affectedRows
  }
})

export const resolveISBN = new ValidatedMethod({
  name: 'books.resolveISBN',
  mixins: [isLoggedInMixin, loggerMixin],
  validate: new SimpleSchema({
    isbn: {
      type: String,
      custom () {
        return isbn.isValid(this.value)
      }
    }
  }).validator(),
  run ({ isbn }) {
    this.unblock()

    const isbnResolveSync = Meteor.wrapAsync(isbnResolver.resolve, isbnResolver)
    let bookInfo = null

    try {
      bookInfo = isbnResolveSync(isbn)
    } catch (err) {
      logger.error(`node-isbn returned error:`, err.message)
    }

    return bookInfo
  }
})

const booksMethods = _.pluck([
  createBook,
  updateBook,
  removeBook,
  resolveISBN
], 'name')

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name (name) {
      return _.contains(booksMethods, name)
    },

    // Rate limit per connection ID
    connectionId () { return true }
  }, 5, 1000)
}
