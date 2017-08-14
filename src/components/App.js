import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import Board, { selectRandomEmptyCell } from './Board';
import Game from './Game';

import logo from './logo.svg';
import './App.css';

function mapStateToProps(state) {
  return {
    board: state.board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class App extends Component {
  constructor() {
    super();

    this.playRandom = this.playRandom.bind(this);
  }

  playRandom(moveId, piece) {
    this.props.playTurn(
      selectRandomEmptyCell(this.props.board.cells),
      moveId,
      piece
    );
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
        <Game resizeBoard={this.props.resizeBoard} />
        <Board board={this.props.board} />
      </div>
    );
  }
}

const AppWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppWithState;
