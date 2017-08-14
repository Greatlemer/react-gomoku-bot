import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Cell.css';

export const BLACK_PIECE = 1,
  EMPTY_CELL = 0,
  WHITE_PIECE = 2;

export default class Cell extends Component {
  render() {
    const { bottom, cell, isKeyCell, left, right, top } = this.props;
    const { contents, moveId } = cell;
    let classes = ['board_cell'];
    if (bottom) { classes.push('bottom_row') }
    if (left) { classes.push('left_column') }
    if (right) { classes.push('right_column') }
    if (top) { classes.push('top_row') }
    if (contents === BLACK_PIECE) {
      classes.push('black_piece');
    } else if (contents === WHITE_PIECE) {
      classes.push('white_piece');
    } else if (isKeyCell) {
      classes.push('key_cell');
    }
    return (
      <li className={classes.join(' ')}>
        <span className="move_number">{moveId}</span>
      </li>
    );
  }
}

Cell.propTypes = {
  bottom: PropTypes.bool.isRequired,
  cell: PropTypes.shape({
    contents: PropTypes.oneOf([
      BLACK_PIECE,
      EMPTY_CELL,
      WHITE_PIECE,
    ]).isRequired,
    moveId: PropTypes.number.isRequired,
  }),
  left: PropTypes.bool.isRequired,
  right: PropTypes.bool.isRequired,
  top: PropTypes.bool.isRequired,
}
