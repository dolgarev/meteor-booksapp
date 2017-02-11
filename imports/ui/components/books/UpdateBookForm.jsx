import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import SimpleSchema from 'simpl-schema'
import Books from '../../../api/books/books.js'
import { MessageFailure } from './Messages.jsx'

export default class UpdateBookForm extends Component {
  constructor(props) {
    super(props)

    const book = Books.findOne({
      _id: this.props.bookId,
      ownerId: Meteor.userId()
    })

    const formData = _.pick(book, 'name', 'author', 'ISBN', 'publishedDate', 'coverUrl')

    this.state = {
      formData,
      formErrors: {},
      actionResult: null
    }
  }

  bookSchema = Books.schema.pick('name', 'author', 'ISBN', 'publishedDate')
  validationContext = this.bookSchema.namedContext('AddBookForm')

  handleSubmit = (e, { formData }) => {
    e.preventDefault()

    const ctx = this.validationContext
    const cleanData = this.bookSchema.clean(formData)

    ctx.validate(cleanData)

    if (!ctx.isValid()) {
      const errors = _.reduce(ctx.validationErrors(), (memo, err) => {
        memo[err.name] = ctx.keyErrorMessage(err.name)
        return memo
      }, {})

      this.setState({ formErrors: errors })
      return
    }

    this.setState({ formErrors: {} })
    this.setState({ formData: cleanData })

    Meteor.call('books.updateBook', {
      bookId: this.props.bookId,
      bookData: cleanData
    }, err => {
      if (err) {
        this.setState({ actionResult: 'failure' })
        this.props.onFailureHandler()
      } else {
        this.setState({ actionResult: 'success' })
        this.props.onSuccessHandler()
      }
    })
  }

  render() {
    const { formData, formErrors, actionResult } = this.state
    const errorMessages = _.values(formErrors)

    let messageComponent = null
    let isDisabledSubmit = false

    switch (actionResult) {
      case 'failure':
        messageComponent = (
          <MessageFailure>The book is not updated</MessageFailure>
        )
        break;

      case 'success':
        isDisabledSubmit = true
        break;
    }

    const { name, author, ISBN, publishedDate, coverUrl } = formData

    return (
      <Form onSubmit={this.handleSubmit} error={!!errorMessages.length}>
        {messageComponent}
        <Form.Input label='Name' name='name' defaultValue={name} placeholder='Book Title' error={!!formErrors.name} />
        <Form.Input label='Author' name='author' defaultValue={author} placeholder='Author' error={!!formErrors.author} />
        <Form.Input label='ISBN' name='ISBN' defaultValue={ISBN} placeholder='ISBN' error={!!formErrors.ISBN} />
        <Form.Input label='Published Date' defaultValue={publishedDate} name='publishedDate' placeholder='Year' error={!!formErrors.publishedDate} />
        <Button primary content='Submit' type='submit' disabled={isDisabledSubmit} />
        <Message error header='There was some errors' list={errorMessages} />
      </Form>
    )
  }
}
