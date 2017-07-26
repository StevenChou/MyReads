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

  /**
  * @description To determine whether it has joined the shelves
  * @param {book} book
  * @returns {boolean}
  */
  isNewBooks = (book) => {
    const tt = this.state.myBooks.filter((b) => {
      return b.id === book.id
    })

    return tt.length === 0? true: false
  }

  /**
  * @description Change the book to the specified bookshelf
  * @param {string} shelf
  * @param {book} book
  */
  changeShelf = (shelf, book) => {
    if (!this.isNewBooks(book)) {
      this.setState((state) => ({
        myBooks: state.myBooks.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
      }))
    } else {
      this.setState((state) => ({
        myBooks: state.myBooks.concat([book])
      }))
    }

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
          <SearchBooks
            myBooks={this.state.myBooks}
            onChangeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
