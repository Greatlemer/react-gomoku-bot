import React, { Component } from 'react';

import { cellGroups } from './Board';
import { BLACK_PIECE, EMPTY_CELL, WHITE_PIECE } from './Cell';
import Player from './Player';

import './Game.css';

const nextPlayer = current_piece => current_piece === BLACK_PIECE ? WHITE_PIECE : BLACK_PIECE;

class Game extends Component {
  constructor() {
    super();

    this.findWinner = this.findWinner.bind(this);
    this.handleBoardResize = this.handleBoardResize.bind(this);
    this.handleGroupSizeUpdate = this.handleGroupSizeUpdate.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.isWaitingFor = this.isWaitingFor.bind(this);
    this.playMove = this.playMove.bind(this);
    this.renderGameButton = this.renderGameButton.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);

    this.state = {
      firstToPlay: BLACK_PIECE,
      gameStarted: false,
    }
  }

  findWinner(board) {
    for (let cellGroup of cellGroups(board)) {
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
          return {
            colour: WHITE_PIECE,
            winningCells: Object.keys(cellGroup),
          };
        } else if (counts[WHITE_PIECE] === 0) {
          return {
            colour: BLACK_PIECE,
            winningCells: Object.keys(cellGroup),
          };
        }
      }
    }
    return null;
  }

  handleBoardResize() {
    this.props.resizeBoard(this.boardSize.value);
  }

  handleGroupSizeUpdate() {
    this.props.changeWinCondition(this.groupSize.value);
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

  isWaitingFor(piece) {
    return this.state.gameStarted && this.state.nextToPlay === piece;
  }

  playMove(location) {
    this.props.playTurn(
      location,
      this.state.moveNumber,
      this.state.nextToPlay
    );
    this.setState((prevState, props) => {
      const winner = this.findWinner(props.board);
      let winMessage = null;
      if (winner && winner.colour === BLACK_PIECE) {
        this.props.highlightWin(winner.winningCells);
        winMessage = 'Black Wins!';
      } else if (winner && winner.colour === WHITE_PIECE) {
        this.props.highlightWin(winner.winningCells);
        winMessage = 'White Wins!';
      } else if (this.state.moveNumber >= this.props.board.cells.length) {
        winMessage = 'The Game Was Tied!';
      }
      return {
        gameStarted: !winMessage,
        moveNumber: this.state.moveNumber + 1,
        nextToPlay: nextPlayer(this.state.nextToPlay),
        waitingForTurn: false,
        winMessage,
      }
    });
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
      );
    }
    return <p>Game in progress...</p>;
  }

  renderPlayer(index, piece) {
    return (
      <Player
        board={this.props.board}
        colour={piece}
        gameStarted={this.state.gameStarted}
        index={index}
        nextMoveNumber={this.state.moveNumber}
        playMove={this.playMove}
        requireHumanInput={this.props.requireHumanInput}
        waitingForMove={this.isWaitingFor(piece)}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>Game Info</h3>
        <div className='board_info'>
          <div>
            <label>Board Size: <input
                defaultValue={15}
                onChange={this.handleBoardResize}
                ref={input => this.boardSize = input}
                type='number'
            /></label>
          </div>
          <div>
            <label>X-in-a-row to win: <input
                defaultValue={5}
                onChange={this.handleGroupSizeUpdate}
                ref={input => this.groupSize = input}
                type='number'
            /></label>
          </div>
          { this.renderGameButton() }
        </div>
        <div className='player_info'>
          { this.renderPlayer(1, BLACK_PIECE) }
          { this.renderPlayer(2, WHITE_PIECE) }
        </div>
      </div>
    )
  }
}

export default Game;
