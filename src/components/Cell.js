import React, { Component } from 'react';

import './Cell.css';

export const BLACK_PIECE = 0,
  EMPTY_CELL = -1,
  WHITE_PIECE = 1;

export default class Cell extends Component {
  render() {
    const { bottom, cell, left, right, top } = this.props;
    let classes = ['board_cell'];
    if (bottom) { classes.push('bottom_row') }
    if (left) { classes.push('left_column') }
    if (right) { classes.push('right_column') }
    if (top) { classes.push('top_row') }
    if (cell === BLACK_PIECE) {
      classes.push('black_piece');
    } else if (cell === WHITE_PIECE) {
      classes.push('white_piece');
    }
    return (
      <li className={classes.join(' ')}></li>
    );
  }
}
