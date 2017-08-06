import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Cell, { EMPTY_CELL } from './Cell';

import './Board.css';

export function newBoard(rows = 15, columns = 15) {
  return {
    cells: new Array(rows * columns).fill(null).map(() => (
      {
        contents: EMPTY_CELL,
        moveId: 0,
      }
    )),
    columns,
    rows,
  };
}

export function selectRandomEmptyCell(cells) {
  const emptyCells = cells.map((cell, index) => {
    if (cell.contents === EMPTY_CELL) {
      return index;
    }
    return -1;
  }).filter(index => index > -1);
  const randomCell = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomCell];
}

function isKeyCell(index, rows, columns) {
  // Key cells are:
  // * The center cell;
  // * The ones four in (diagonally) from each corner;
  // * The ones four in from the side and in the middle (when cols or rows > 18);
  const cellColumn = index % rows;
  const cellRow = Math.floor(index / columns);
  const fourFromBottom = rows - 4;
  const fourFromRight = columns - 4;
  const middleColumn = Math.floor(columns / 2);
  const middleRow = Math.floor(rows / 2);
  if (cellColumn === 3 || cellColumn === fourFromRight) {
    if (cellRow === 3 || cellRow === fourFromBottom) {
      return true;
    }
    return rows > 18 && cellRow === middleRow;
  } else if (cellColumn === middleColumn) {
    if (cellRow === middleRow) {
      return true;
    }
    return (columns > 18 && (cellRow === 3 || cellRow === fourFromBottom));
  }
  return false;
}

export default class Board extends Component {
  renderCell(cell, index, board) {
    const sides = {
      bottom: index >= (board.cells.length - board.columns),
      left: index % board.rows === 0,
      right: (index + 1) % board.rows === 0,
      top: index < board.columns,
    }
    const keyCell = isKeyCell(index, board.rows, board.columns);
    return (
      <Cell cell={cell} isKeyCell={keyCell} {...sides} key={index} />
    );
  }

  render() {
    const { board } = this.props;
    const style = {
      width: `${board.columns}em`,
    }
    return (
      <ol className="gomoku_board" style={style}>
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
