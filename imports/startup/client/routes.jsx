import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import React from 'react'
import { mount } from 'react-mounter'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Import needed templates
import AccountsLayout from '../../ui/layouts/AccountsLayout.jsx'
import AccountsPage from '../../ui/pages/accounts/AccountsPage.jsx'

import MainLayout from '../../ui/layouts/MainLayout.jsx'
import AboutPage from '../../ui/pages/about/AboutPage.jsx'
import BooksPage from '../../ui/pages/books/BooksPage.jsx'
import HomePage from '../../ui/pages/home/HomePage.jsx'

import '../../ui/layouts/body/body.js'
import '../../ui/pages/not-found/not-found.js'

injectTapEventPlugin()

const privateRoutes = FlowRouter.group({
  name: 'privateRoutes',
  triggersEnter: [function (context, redirect, stop) {
    const currentUserId = Meteor.userId()

    if (!_.isString(currentUserId)) {
      redirect('/accounts')
      return stop()
    }
  }]
})

// Set up all routes in the app
privateRoutes.route('/', {
  name: 'home',
  action () {
    mount(MainLayout, {
      content: (<HomePage />)
    })
  }
})

FlowRouter.route('/accounts', {
  name: 'accounts',
  action () {
    mount(AccountsLayout, {
      content: (<AccountsPage />)
    })
  }
})

privateRoutes.route('/books', {
  name: 'books',
  action () {
    mount(MainLayout, {
      content: (<BooksPage />)
    })
  }
})

privateRoutes.route('/about', {
  name: 'about',
  action () {
    mount(MainLayout, {
      content: (<AboutPage />)
    })
  }
})

FlowRouter.notFound = {
  action () {
    BlazeLayout.render('App_body', { main: 'App_notFound' })
  }
}
