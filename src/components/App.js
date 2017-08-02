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
          <h2>
            <img src={logo} className="App-logo" alt="logo" />
            Gomoku BattleBot: (React Edition)
            <img src={logo} className="App-logo" alt="logo" />
          </h2>
        </div>
        <Board board={this.state.board} />
      </div>
    );
  }
}

export default App;
