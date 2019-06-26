import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <NavBar/>
        <Route exact path="/" component={Search} />
        <Route exact path="/saved" component={Saved} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
