import React from 'react'
import { Container } from 'semantic-ui-react'
import TopbarComponent from '../components/topbar/TopbarComponent.jsx'

const MainLayout = ({ content }) => (
  <Container>
    <TopbarComponent />
    { content }
  </Container>
)

export default MainLayout
