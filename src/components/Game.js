import React, { Component } from 'react';

import { BLACK_PIECE, WHITE_PIECE } from './Cell';
import Player from './Player';

import './Game.css';

const nextPlayer = current_piece => current_piece === BLACK_PIECE ? WHITE_PIECE : BLACK_PIECE;

export default class Game extends Component {
  constructor() {
    super();

    this.endGame = this.endGame.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.renderGameButton = this.renderGameButton.bind(this);
    this.requestNextMove = this.requestNextMove.bind(this);
    this.resizeBoard = this.resizeBoard.bind(this);

    this.state = {
      firstToPlay: BLACK_PIECE,
      gameStarted: false,
    }
  }

  resizeBoard() {
    this.props.resizeBoard(this.boardSize.value);
  }

  endGame() {
    this.setState({
      ...this.state,
      gameStarted: false,
    });
  }

  handleStartGame() {
    this.setState({
      ...this.state,
      firstToPlay: nextPlayer(this.state.firstToPlay),
      gameStarted: true,
      moveNumber: 1,
      nextToPlay: this.state.firstToPlay,
    });
    this.forceUpdate();
    this.playGame();
  }

  playGame() {
    let nextMove = this.requestNextMove();
    while (nextMove) {
      this.props.playTurn(
        nextMove,
        this.state.moveNumber,
        this.state.nextToPlay
      );
      this.setState({
        ...this.state,
        moveNumber: this.state.moveNumber + 1,
        nextToPlay: nextPlayer(this.state.nextToPlay),
      });
      console.log(this.state.moveNumber);
      if (this.state.moveNumber > 30) {
        this.endGame('Short Game Timeout');
        break;
      }
      nextMove = false; //this.requestNextMove();
      this.forceUpdate();
    }
  }

  requestNextMove() {
    switch (this.state.nextToPlay) {
      case BLACK_PIECE:
        return this.blackController.nextMove();
      case WHITE_PIECE:
        return this.whiteController.nextMove();
      default:
        this.endGame('Unknown player');
        return false;
    }
  }

  renderGameButton() {
    if (!this.state.gameStarted) {
      return (
        <div>
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
            ref={input => this.blackController = input}
          />
          <Player
            board={this.props.board}
            colour={WHITE_PIECE}
            index={2}
            ref={input => this.whiteController = input}
          />
        </div>
      </div>
    )
  }
}
