import React, { Component } from 'react';

import { BLACK_PIECE, WHITE_PIECE } from './Cell';
import Player from './Player';

import './Game.css';

export default class Game extends Component {
  constructor() {
    super();

    this.resizeBoard = this.resizeBoard.bind(this);
  }

  resizeBoard() {
    this.props.resizeBoard(this.boardSize.value);
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
        </div>
        <div className='player_info'>
          <Player index={1} colour={BLACK_PIECE} />
          <Player index={2} colour={WHITE_PIECE} />
        </div>
      </div>
    )
  }
}
