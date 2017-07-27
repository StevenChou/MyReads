import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, onChangeShelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks? (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          ):(<div className="book-cover" >No Image!!</div>)}

          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => onChangeShelf(event.target.value, book)}>
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
    )
  }
}

export default Book