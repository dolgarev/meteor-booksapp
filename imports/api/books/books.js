import { Mongo } from 'meteor/mongo'
import { _ } from 'meteor/underscore'
import { moment } from 'meteor/momentjs:moment'
import SimpleSchema from 'simpl-schema'
import isbn from 'isbn-utils'

const Books = new Mongo.Collection('books')
export default Books

Books.permit(['insert', 'update', 'remove']).never()
Books.ndxModified()

Books.schema = new SimpleSchema({
  name: {
    type: String,
    min: 1,
    max: 200
  },
  author: {
    type: String,
    min: 1,
    max: 200
  },
  ISBN: {
    type: String,
    min: 10,
    max: 30,
    custom () {
      if (!isbn.isValid(this.value)) return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED
    }
  },
  publishedDate: {
    type: String,
    allowedValues () {
      const years = _.range(1800, moment().year() + 1)
      return _.map(years, year => String(year))
    }
  },
  coverUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  updatedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  }
})

Books.attachSchema(Books.schema)
