import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loop } from 'react-game-kit';

import * as actionCreators from '../actions/actionCreators';
import Board from './Board';
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
  render() {
    let titleStart = `${this.props.board.groupSize}-in-a-row`;
    if (this.props.board.groupSize === 3 && this.props.board.rows === 3) {
      titleStart = 'Tic-Tac-Toe';
    } else if (this.props.board.groupSize === 5 && this.props.board.rows === 15) {
      titleStart = 'Gomoku';
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <img src={logo} className="App-logo" alt="logo" />
            {titleStart} Battler: (React Edition)
            <img src={logo} className="App-logo" alt="logo" />
          </h2>
        </div>
        <Loop>
          <Game
            board={this.props.board}
            changeWinCondition={this.props.changeWinCondition}
            highlightWin={this.props.highlightWin}
            playTurn={this.props.playTurn}
            requireHumanInput={this.props.requireHumanInput}
            resetBoard={this.props.resetBoard}
            resizeBoard={this.props.resizeBoard}
          />
        </Loop>
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
