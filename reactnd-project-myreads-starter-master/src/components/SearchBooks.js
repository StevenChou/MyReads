import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
// import escapeRegExp from 'escape-string-regexp'

import * as BooksAPI from './../utils/BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  /**
  * @description Synchronize bookshelf information
  * @param {book} book
  */
  sycShelf = (books) => {
    const { myBooks } = this.props;

    books.forEach(function(element) {
      element.shelf = "none"
      myBooks.forEach(function(el) {
        if (el.id === element.id)
          element.shelf = el.shelf
      })
    }, this)
  }

  updateQuery = (query) => {
    this.setState({ query })

    BooksAPI.search(query, 10).then((books) => {
      this.sycShelf(books)
      !books.error? this.setState({ books }): this.setState({ books: [] })
    }).catch((e) => {
      setTimeout(() => this.setState({ books: [] }), 1500)
    })
  }

  handleChange = (shelf, book) => {
    const { onChangeShelf } = this.props;
    onChangeShelf(shelf, book)

    const books = this.state.books.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf
      }
      return b
    })

    this.setState({ books })
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.handleChange(event.target.value, book)}>
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks