import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import Griddle from 'griddle-react'
import Books from '../../../api/books/books.js'
import UpdateBookButton from './UpdateBookButton.jsx'
import RemoveBookButton from './RemoveBookButton.jsx'

const BookActionsColumn = ({ rowData }) => (
  <div>
    <UpdateBookButton bookId={rowData.id} />
    <RemoveBookButton bookId={rowData.id} />
  </div>
)

const columnsMetadata = [
  {
    columnName: 'name',
    order: 1,
    locked: false,
    visible: true,
    displayName: 'Book Title'
  },
  {
    columnName: 'author',
    order: 2,
    locked: false,
    visible: true,
    displayName: 'Author'
  },
  {
    columnName: 'publishedDate',
    order: 3,
    locked: false,
    visible: true,
    displayName: 'Published Date'
  },
  {
    columnName: '__actions',
    order: 4,
    locked: true,
    visible: false,
    displayName: 'Actions',
    customComponent: BookActionsColumn
  }
]

const BooksGridComponent = props => (
  <Griddle
    results={props.books}
    columnMetadata={columnsMetadata}
    columns={['name', 'author', 'publishedDate', '__actions']}
    useExternal={true}
    externalSetPage={props.setPageHandler}
    externalChangeSort={props.changeSortHandler}
    externalSetFilter={props.setFilterHandler}
    externalSetPageSize={props.setPageSizeHandler}
    externalMaxPage={props.maxPage}
    externalCurrentPage={props.currentPage}
    externalSortColumn={props.sortColumn}
    externalSortAscending={props.sortAscending}
  />
)

const BooksGridContainer = createContainer(({ params }) => {
  const { currentPage, sortColumn, sortAscending, pageSize } = params

  const sub = Meteor.subscribe('books.list', {
    currentPage,
    sortColumn,
    sortAscending,
    pageSize
  })

  const loading = !sub.ready();

  const options = {
    limit: pageSize
  }

  if (_.isString(sortColumn) && sortColumn.length) {
    options.sort = {
      [sortColumn]: sortAscending ? 1 : -1
    }
  }

  const books = Books.find({ ownerId: Meteor.userId() }, options).map(book => ({
    id: book._id,
    name: book.name,
    author: book.author,
    publishedDate: book.publishedDate,
    __actions: null
  }))

  const matchingResults = Counts.get('matching-books')
  const maxPage = Math.ceil(matchingResults / pageSize)

  return {
    loading,
    books,
    maxPage
  }
}, BooksGridComponent)

export default class BooksGrid extends Component {
  state = {
    currentPage: 0,
    sortColumn: 'name',
    sortAscending: true,
    pageSize: 10
  }

  setPageHandler = page => this.setState({ currentPage: page })
  setPageSizeHandler = size => this.setState({ pageSize: size })
  setFilterHandler = () => {}

  changeSortHandler = (column, sortAscending) => this.setState({
    sortColumn: column,
    sortAscending
  })

  render() {
    const { currentPage, sortColumn, sortAscending, pageSize } = this.state
    const params = {
      currentPage,
      sortColumn,
      sortAscending,
      pageSize
    }

    return (
      <BooksGridContainer
        setPageHandler={this.setPageHandler}
        changeSortHandler={this.changeSortHandler}
        setFilterHandler={this.setFilterHandler}
        setPageSizeHandler={this.setPageSizeHandler}
        currentPage={currentPage}
        sortColumn={sortColumn}
        sortAscending={sortAscending}
        params={params}
      />
    )
  }
}
