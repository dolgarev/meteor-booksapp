import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const aboutStyle = {
  textAlign: 'right'
}

const AboutPage = () => (
  <div>
    <Header as='h2' attached='top'>
      About Us
    </Header>
    <Segment padded attached>
      <p>Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.</p>
      <p style={aboutStyle}>Oleg Dolgaryov</p>
    </Segment>
  </div>
)

export default AboutPage
