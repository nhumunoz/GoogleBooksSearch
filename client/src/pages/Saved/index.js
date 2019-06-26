import React, { Component } from 'react';
import API from "../../utils/API";

export default class Saved extends Component {

  state = {
    books: []
  }

  loadBooks = () => API.getBooks()
    .then(response => {
      console.log("Got all the books: ", response);
      this.setState({ books: response.data })
    })

  componentDidMount() {
    this.loadBooks();
  }
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
