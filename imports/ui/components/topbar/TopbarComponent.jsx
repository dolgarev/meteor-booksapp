import { Meteor } from "meteor/meteor"
import { FlowRouter } from 'meteor/kadira:flow-router'
import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import AvatarContainer from '../avatar/AvatarContainer.jsx'

const avatarItemStyle = {
  paddingBottom: '0.2rem'
}

const TopbarComponent = () => {
  const activeItem = FlowRouter.getRouteName()

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item name='home' href='/' active={activeItem === 'home'}>
          Home
        </Menu.Item>
        <Menu.Item name='books' href='/books' active={activeItem === 'books'}>
          Books
        </Menu.Item>
        <Menu.Item name='about' href='/about' active={activeItem === 'about'}>
          About Us
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item style={avatarItemStyle}>
            <AvatarContainer />
          </Menu.Item>
          <Menu.Item name='logout' onClick={() => Meteor.logout()}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default TopbarComponent
