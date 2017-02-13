import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Notify from '../../helpers/notify_helper.js'

export default class RemoveBookButton extends Component {
  state = { modalOpen: false }

  handleOpenModal = () => this.setState({ modalOpen: true })
  handleCloseModal = () => this.setState({ modalOpen: false })

  handleRemoveAction = () => {
    const { bookId } = this.props

    Meteor.call('books.removeBook', { bookId }, err => {
      if (err) {
        Notify.failure('The book is not removed')
      } else {
        Notify.success('The book was removed')
      }
      this.handleCloseModal()
    })
  }

  render () {
    const { modalOpen } = this.state

    return (
      <Modal trigger={
        <Button
          compact
          color='red'
          content='Remove'
          icon='cancel'
          onClick={this.handleOpenModal}
        />
      }
        open={modalOpen}
        onClose={this.handleCloseModal}
        closeIcon='close'
      >
        <Modal.Header>Remove Book</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your book?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={this.handleCloseModal} />
          <Button positive content='Yes' onClick={this.handleRemoveAction} />
        </Modal.Actions>
      </Modal>
    )
  }
}
