import React, { Component } from 'react'
import { Input, FormBtn } from "../../components/Form";
import "./style.css"
import googleApi from "../../utils/googleApi";
import API from "../../utils/API";

export default class Search extends Component {
  state = {
    books: [],
    queryString: ""
  };

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({ queryString: event.target.value });
  }

  handleSave = (book) => {
    API.saveBook(book).then(()=>{}).catch(err=>{console.log(err);
    })
  }

  handleSearch = () => {
    googleApi.search(this.state.queryString)
      .then(response => {
        let books = response.data.items.map(book => {
          if (!book.volumeInfo.imageLinks) {
            book.volumeInfo.imageLinks = { thumbnail: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwiL_OCykYbjAhUXac0KHX27D9UQjRx6BAgBEAU&url=https%3A%2F%2Fwww.maxpixel.net%2FBook-Cover-Empty-Book-Isolated-3057901&psig=AOvVaw1MQT4rWO9-X4v8jApgH83D&ust=1561603727572039" }
          }
          let result = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageUrl: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.canonicalVolumeLink
          }
          console.log(result);
          return result;
        });
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
            this.state.books.map((book, i) => {
              return (
                <div key={i} className="book">
                  <img src={book.imageUrl} />
                  <div>
                    <div>
                      {book.title}
                    </div>
                    <p>
                      {book.description}
                    </p>
                    <a href={book.link}>Go to book!</a>
                    <FormBtn onClick= {()=>{this.handleSave(book)}}>Save</FormBtn>
                  </div>
                </div>);
            }) : "Search for a book!"}

        </div>
      </div>
    )
  }
}