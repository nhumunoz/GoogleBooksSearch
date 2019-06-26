import React, { Component } from 'react';
import {FormBtn} from "../../components/Form";
import API from "../../utils/API";

export default class Saved extends Component {

  state = {
    books: []
  }

  handleDelete = id =>{
    console.log(id);
    
    API.deleteBook(id).then(()=>{
      this.loadBooks();
    })
    .catch(err=>{
      console.log(err);
    })
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
                    <FormBtn onClick= {()=>{this.handleDelete(book._id)}}>Delete</FormBtn>
                  </div>
                </div>);
            }) : "You don't have any books saved."}
      </div>
    )
  }
}
