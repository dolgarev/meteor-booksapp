import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import UpdateBookForm from './UpdateBookForm.jsx'

export default class UpdateBookButton extends Component {
  state = {
    modalOpen: false
  }

  handleOpenModal = () => this.setState({ modalOpen: true })
  handleCloseModal = () => this.setState({ modalOpen: false })
  handleFailure = () => {}
  handleSuccess = () => this.handleCloseModal()

  render() {
    const { modalOpen } = this.state
    const { bookId } = this.props

    return (
      <Modal
        trigger={
          <Button
            primary
            compact
            content='Update'
            icon='pencil'
            onClick={this.handleOpenModal}
          />
        }
        open={modalOpen}
        onClose={this.handleCloseModal}
        closeIcon='close'
      >
        <Modal.Header>Update Book</Modal.Header>
        <Modal.Content>
          <UpdateBookForm
            bookId={bookId}
            onFailureHandler={this.handleFailure}
            onSuccessHandler={this.handleSuccess}
          />
        </Modal.Content>
      </Modal>
    )
  }
}
