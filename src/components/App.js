import React, { Component } from 'react';

import Board, { newBoard, selectRandomEmptyCell } from './Board';

import logo from './logo.svg';
import './App.css';

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
    this.playTurn(
      selectRandomEmptyCell(this.state.board.cells),
      moveId,
      piece
    );
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
