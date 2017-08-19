import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { cellGroups } from './Board';
import { BLACK_PIECE, EMPTY_CELL, WHITE_PIECE } from './Cell';
import Player from './Player';

import './Game.css';

const nextPlayer = current_piece => current_piece === BLACK_PIECE ? WHITE_PIECE : BLACK_PIECE;

class Game extends Component {
  constructor() {
    super();

    this.endGame = this.endGame.bind(this);
    this.findWinner = this.findWinner.bind(this);
    this.handleGameTick = this.handleGameTick.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.isWaitingFor = this.isWaitingFor.bind(this);
    this.playMove = this.playMove.bind(this);
    this.renderGameButton = this.renderGameButton.bind(this);
    this.resizeBoard = this.resizeBoard.bind(this);

    this.state = {
      firstToPlay: BLACK_PIECE,
      gameStarted: false,
    }
  }

  componentDidMount() {
    // this.context.loop.subscribe(this.handleGameTick);
  }

  componentWillUnmount() {
    // this.context.loop.unsubscribe(this.handleGameTick);
  }

  resizeBoard() {
    this.props.resizeBoard(this.boardSize.value);
  }

  endGame(winMessage) {
    this.setState({
      ...this.state,
      gameStarted: false,
      winMessage,
    });
  }

  findWinner() {
    for (let cellGroup of cellGroups(this.props.board)) {
      const counts = {
        [BLACK_PIECE]: 0,
        [EMPTY_CELL]: 0,
        [WHITE_PIECE]: 0,
      };
      for (let cell of Object.values(cellGroup)) {
        counts[cell.contents] += 1;
      }
      if (counts[EMPTY_CELL] === 0) {
        if (counts[BLACK_PIECE] === 0) {
          return WHITE_PIECE;
        } else if (counts[WHITE_PIECE] === 0) {
          return BLACK_PIECE;
        }
      }
    }
    return null;
  }

  handleStartGame() {
    this.props.resetBoard();
    this.setState({
      ...this.state,
      firstToPlay: nextPlayer(this.state.firstToPlay),
      gameStarted: true,
      moveNumber: 1,
      nextToPlay: this.state.firstToPlay,
      winMessage: null,
    });
  }

  handleGameTick() {
    if (this.state.gameStarted && !this.state.waitingForTurn) {
      this.setState({
        waitingForTurn: true,
      });
      // this.playNextMove();
    }
  }

  isWaitingFor(piece) {
    return this.state.gameStarted && this.state.nextToPlay === piece;
  }

  playMove(location) {
    this.props.playTurn(
      location,
      this.state.moveNumber,
      this.state.nextToPlay
    );
    this.setState({
      moveNumber: this.state.moveNumber + 1,
      nextToPlay: nextPlayer(this.state.nextToPlay),
      waitingForTurn: false,
    });
    const winner = this.findWinner();
    if (winner === BLACK_PIECE) {
      this.endGame('Black Wins!');
    } else if (winner === WHITE_PIECE) {
      this.endGame('White Wins!');
    } else if (this.state.moveNumber > (this.props.board.columns * this.props.board.rows)) {
      this.endGame('The Game Was Tied!');
    }
  }

  async playNextMove() {
    let controller;
    if (this.state.nextToPlay === BLACK_PIECE) {
      controller = this.blackController;
    } else {
      controller = this.whiteController;
    }
    controller.nextMove(this.playMove);
  }

  renderGameButton() {
    let winMessage = '';
    if (this.state.winMessage) {
      winMessage = (
        <p>{this.state.winMessage}</p>
      )
    }
    if (!this.state.gameStarted) {
      return (
        <div>
          {winMessage}
          <button onClick={this.handleStartGame}>Start Game</button>
        </div>
      )
    }
    return <p>Game in progress...</p>;
  }

  render() {
    return (
      <div>
        <h3>Game Info</h3>
        <div className='board_info'>
          <div>
            <label>Board Size: <input
                defaultValue={15}
                onChange={this.resizeBoard}
                ref={input => this.boardSize = input}
                type='number'
            /></label>
          </div>
          { this.renderGameButton() }
        </div>
        <div className='player_info'>
          <Player
            board={this.props.board}
            colour={BLACK_PIECE}
            index={1}
            nextMoveNumber={this.state.moveNumber}
            playMove={this.playMove}
            ref={input => this.blackController = input}
            waitingForMove={this.isWaitingFor(BLACK_PIECE)}
          />
          <Player
            board={this.props.board}
            colour={WHITE_PIECE}
            index={2}
            nextMoveNumber={this.state.moveNumber}
            playMove={this.playMove}
            ref={input => this.whiteController = input}
            waitingForMove={this.isWaitingFor(WHITE_PIECE)}
          />
        </div>
      </div>
    )
  }
}

Game.contextTypes = {
  loop: PropTypes.object,
};

export default Game;
