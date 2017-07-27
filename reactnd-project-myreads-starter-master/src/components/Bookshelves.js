import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

class Bookshelves extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { myBooks, onChangeShelf } = this.props;
    const shelves = [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: myBooks.filter(myBook => myBook.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: myBooks.filter(myBook => myBook.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title: 'Read',
        books: myBooks.filter(myBook => myBook.shelf === 'read')
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <BookShelf
                key={shelf.id}
                title={shelf.title}
                books={shelf.books}
                onChangeShelf={onChangeShelf} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelves