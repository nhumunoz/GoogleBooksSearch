import React, { Component } from 'react'
import { Input, FormBtn } from "../../components/Form";
import "./style.css"
import googleApi from "../../utils/googleApi";

export default class Search extends Component {
  state = {
    books: [],
    queryString: ""
  };

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({ queryString: event.target.value });
  }

  handleSearch = () => {
    googleApi.search(this.state.queryString)
      .then(response => {
        let books = Promise.all(response.data.items.map(book => {
          return {
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageUrl: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.canonicalVolumeLink
          }
        }));
        this.setState({ books: books });
      });
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <hr />
          <Input onChange={this.handleInputChange} />
          <hr />
          <FormBtn onClick={this.handleSearch}>Search Book</FormBtn>

          {(this.state.books.length > 0) ?
            this.state.books.map(book => {
              return (<div>{book.title}</div>);
            }) : "Search for a book!"}

        </div>
      </div>
    )
  }
}