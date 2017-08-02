import React, { Component } from 'react';

import Board, { newBoard } from './Board';

import logo from './logo.svg';
import './App.css';

import { EMPTY_CELL } from './Cell'

class App extends Component {
  constructor() {
    super();

    this.playRandom = this.playRandom.bind(this);
    this.playTurn = this.playTurn.bind(this);

    this.state = {
      board: newBoard(),
    };
  }

  playRandom(moveId, piece) {
    const emptyCells = this.state.board.cells.map((cell, index) => {
      if (cell.contents === EMPTY_CELL) {
        return index;
      }
      return -1;
    }).filter(index => index > -1);
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    this.playTurn(emptyCells[randomCell], moveId, piece);
  }

  playTurn(location, moveId, piece) {
    const cells = [
      ...this.state.board.cells.slice(0, location),
      {
        contents: piece,
        moveId,
      },
      ...this.state.board.cells.slice(location + 1),
    ];
    this.setState({ board: { ...this.state.board, cells }});
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
