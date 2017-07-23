import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './../utils/BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelves from './Bookshelves'

import './../../style/App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      myBooks: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ myBooks })
    })
  }

  changeShelf = (shelf, book) => {
    const myBooks = this.state.myBooks.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf
      }
      return b
    })

    this.setState({ myBooks })

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelves 
            myBooks={this.state.myBooks}
            onChangeShelf={this.changeShelf} />
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
