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
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <img src={logo} className="App-logo" alt="logo" />
            Gomoku BattleBot: (React Edition)
            <img src={logo} className="App-logo" alt="logo" />
          </h2>
        </div>
        <Loop>
          <Game
            board={this.props.board}
            highlightWin={this.props.highlightWin}
            playTurn={this.props.playTurn}
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
