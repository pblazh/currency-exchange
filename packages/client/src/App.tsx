import React, { Component } from "react";
import "./App.css";
import { ExchangeRate } from "./widgets";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <ExchangeRate />
      </div>
    );
  }
}

export default App;
