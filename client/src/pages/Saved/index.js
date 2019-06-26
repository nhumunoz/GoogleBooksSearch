import React, { Component } from 'react';
import API from "../../utils/API";

export default class Saved extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => API.getBooks()
    .then(response => {
      console.log("Got all the books: ", response);
      this.setState({ books: response.data })
    })

  render() {
    return (
      <div>
        Saved Book!
        {this.state.books.map(book => {
          return <div>{book.title}</div>
        })}
      </div>
    )
  }
}
