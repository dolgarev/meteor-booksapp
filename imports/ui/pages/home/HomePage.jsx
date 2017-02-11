import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'

const HomePage = () => (
  <div>
    <Segment padded color='blue'>
      <Header as='h2'>Task for testing</Header>
      <p>These components were used in the project:</p>
      <List as='ol'>
        <List.Item as='li'><a href='https://www.meteor.com/' target='_blank'>Meteor 1.4</a></List.Item>
        <List.Item as='li'><a href='https://facebook.github.io/react/' target='_blank'>React</a></List.Item>
        <List.Item as='li'><a href='http://react.semantic-ui.com' target='_blank'>Semantic UI React</a></List.Item>
        <List.Item as='li'><a href='https://griddlegriddle.github.io/Griddle/' target='_blank'>Griddle</a></List.Item>
      </List>
      <p>This is the first time, when I used Meteor along with React and Semantic UI React, that is why some shortcomings are possible.</p>
      <p>For instance, I did not polish appearence of Griddle for styles Semantic UI.</p>
    </Segment>
  </div>
)

export default HomePage
