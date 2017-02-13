import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import Books from '../../../api/books/books.js'
import { MessageFailure } from './Messages.jsx'

export default class UpdateBookForm extends Component {
  constructor (props) {
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
  validationContext = this.bookSchema.namedContext('UpdateBookForm')

  validateForm = formData => {
    const ctx = this.validationContext
    const cleanData = this.bookSchema.clean(formData)

    ctx.validate(cleanData)

    const isValid = ctx.isValid()
    let errors = {}

    if (!isValid) {
      errors = _.reduce(ctx.validationErrors(), (memo, err) => {
        memo[err.name] = ctx.keyErrorMessage(err.name)
        return memo
      }, {})
    }

    return {
      cleanData,
      isValid,
      errors
    }
  }

  handleSubmit = (e, { formData }) => {
    e.preventDefault()

    const { cleanData, isValid, errors } = this.validateForm(formData)
    this.setState({ formErrors: errors })

    if (!isValid) return

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

  render () {
    const { formData, formErrors, actionResult } = this.state
    const errorMessages = _.values(formErrors)
    const hasErrors = !!errorMessages.length

    let messageComponent = null
    let isDisabledSubmit = false

    switch (actionResult) {
      case 'failure':
        messageComponent = (
          <MessageFailure>The book is not updated</MessageFailure>
        )
        break

      case 'success':
        isDisabledSubmit = true
        break
    }

    const { name, author, ISBN, publishedDate } = formData

    return (
      <Form onSubmit={this.handleSubmit} error={hasErrors}>
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
