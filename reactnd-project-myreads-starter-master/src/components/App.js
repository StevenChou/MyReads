import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './../utils/BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelves from './Bookshelves'

import './../../style/App.css'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelves />
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
