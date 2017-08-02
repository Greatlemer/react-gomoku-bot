import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Cell, { BLACK_PIECE, EMPTY_CELL, WHITE_PIECE } from './Cell';

import './Board.css';

export function newBoard(rows = 15, columns = 15) {
  return {
    cells: new Array(rows * columns).fill(null).map((_, index) => (
      {
        contents: EMPTY_CELL,
        moveId: index + 1,
      }
    )),
    columns,
    rows,
  };
}

export default class Board extends Component {
  renderCell(cell, index, board) {
    const sides = {
      bottom: index >= (board.cells.length - board.columns),
      left: index % board.rows === 0,
      right: (index + 1) % board.rows === 0,
      top: index < board.columns,
    }
    return (
      <Cell cell={cell} {...sides} key={index} />
    );
  }

  render() {
    const { board } = this.props;
    return (
      <ol className="gomoku_board">
        {board.cells.map((cell, index) => this.renderCell(cell, index, board))}
      </ol>
    );
  }
}

Board.propTypes = {
  board: PropTypes.shape({
    cells: PropTypes.arrayOf(
      Cell.propTypes.cell.isRequired,
    ),
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
  }).isRequired,
}
