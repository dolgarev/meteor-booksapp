import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import AddBookButton from '../../components/books/AddBookButton.jsx'
import BooksGrid from '../../components/books/BooksGrid.jsx'

const BooksPage = () => (
  <Grid columns={16}>
    <Grid.Row>
      <Grid.Column width={16}>
        <AddBookButton />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16}>
        <BooksGrid />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default BooksPage
