import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import Books from '../books.js'

Meteor.publish('books.list', function (params) {
  if (!this.userId) {
    return this.stop()
  }

  try {
    check(params, Object)
    check(params.currentPage, Match.Integer)
    check(params.sortColumn, Match.Maybe(String))
    check(params.sortAscending, Match.Maybe(Boolean))
    check(params.pageSize, Match.Maybe(Match.Integer))
  } catch (err) {
    this.error(err)
  }

  const { currentPage, sortColumn, sortAscending, pageSize = 10 } = params

  const query = {
    ownerId: this.userId
  }

  const options = {
    fields: {
      name: 1,
      author: 1,
      ISBN: 1,
      publishedDate: 1,
      coverUrl: 1,
      ownerId: 1
    },
    limit: pageSize,
    skip: currentPage * pageSize
  }

  if (_.isString(sortColumn) && sortColumn.length) {
    options.sort = {
      [sortColumn]: sortAscending ? 1 : -1
    }
  }

  Counts.publish(this, 'matching-books', Books.find(query, options))
  return Books.find(query, options)
})
