import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Cell.css';

export const BLACK_PIECE = 1,
  EMPTY_CELL = 0,
  WHITE_PIECE = 2;

export default class Cell extends Component {
  render() {
    const { bottom, cell, isKeyCell, isWinner, left, right, top } = this.props;
    const { contents, moveId } = cell;
    const cellClasses = classNames(
      'board_cell',
      {
        'black_piece': contents === BLACK_PIECE,
        'bottom_row': bottom,
        'key_cell': isKeyCell && (contents === EMPTY_CELL),
        'left_column': left,
        'right_column': right,
        'top_row': top,
        'white_piece': contents === WHITE_PIECE,
        'winning_piece': isWinner,
      }
    )
    return (
      <li className={cellClasses} onClick={this.props.handleCellClick}>
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
