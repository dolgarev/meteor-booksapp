import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import SimpleSchema from 'simpl-schema'
import Books from '../../../api/books/books.js'
import { MessageFailure } from './Messages.jsx'

export default class AddBookForm extends Component {
  state = {
    formData: {},
    formErrors: {},
    actionResult: null
  }

  bookSchema = Books.schema.pick('name', 'author', 'ISBN', 'publishedDate')
  validationContext = this.bookSchema.namedContext('AddBookForm')

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

    Meteor.call('books.createBook', cleanData, err => {
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
    const { formErrors, actionResult } = this.state
    const errorMessages = _.values(formErrors)
    const hasErrors = !!errorMessages.length

    let messageComponent = null
    let isDisabledSubmit = false

    switch (actionResult) {
      case 'failure':
        messageComponent = (
          <MessageFailure>The book is not added</MessageFailure>
        )
        break;

      case 'success':
        isDisabledSubmit = true
        break;
    }

    return (
      <Form onSubmit={this.handleSubmit} error={hasErrors}>
        {messageComponent}
        <Form.Input label='Name' name='name' placeholder='Book Title' error={!!formErrors.name} />
        <Form.Input label='Author' name='author' placeholder='Author' error={!!formErrors.author} />
        <Form.Input label='ISBN' name='ISBN' placeholder='ISBN' error={!!formErrors.ISBN} />
        <Form.Input label='Published Date' name='publishedDate' placeholder='Year' error={!!formErrors.publishedDate} />
        <Button primary content='Submit' type='submit' disabled={isDisabledSubmit} />
        <Message error header='There was some errors' list={errorMessages} />
      </Form>
    )
  }
}
