import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import AddBookForm from './AddBookForm.jsx'

export default class AddBookButton extends Component {
  state = {
    modalOpen: false
  }

  handleOpenModal = () => this.setState({ modalOpen: true })
  handleCloseModal = () => this.setState({ modalOpen: false })
  handleFailure = () => {}
  handleSuccess = () => this.handleCloseModal()

  render() {
    const { modalOpen } = this.state

    return (
      <Modal
        trigger={
          <Button
            primary
            content='Add Book'
            floated='right'
            icon='plus'
            onClick={this.handleOpenModal}
          />
        }
        open={modalOpen}
        onClose={this.handleCloseModal}
        closeIcon='close'
      >
        <Modal.Header>Add Book</Modal.Header>
        <Modal.Content>
          <AddBookForm
            onFailureHandler={this.handleFailure}
            onSuccessHandler={this.handleSuccess}
          />
        </Modal.Content>
      </Modal>
    )
  }
}
