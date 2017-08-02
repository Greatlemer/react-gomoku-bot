import React, { Component } from 'react';

import Board, { newBoard } from './Board';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: newBoard(),
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board board={this.state.board} />
      </div>
    );
  }
}

export default App;
