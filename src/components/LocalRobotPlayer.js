import { cellGroups } from './Board';
import PlayerController from './PlayerController';

import { BLACK_PIECE, EMPTY_CELL, WHITE_PIECE } from './Cell';

function opponent(piece) {
  if (piece === WHITE_PIECE) {
    return BLACK_PIECE;
  }
  return WHITE_PIECE;
}

function generateCellScores(groupSize) {
  let emptyCells = groupSize - 1,
    target = 'threat';
  const scores = {
    opportunity: {},
    threat: {},
  };
  while (emptyCells > 0) {
    scores[target][emptyCells] = 1;
    if (target === 'opportunity') {
      emptyCells -= 1;
      target = 'threat';
    } else {
      target = 'opportunity';
    }
  }
  return scores;
}

function determineNextMove(board, generateWeightsFunction, colour) {
  // This could be cached upon groupSize being set
  const cellScores = generateWeightsFunction(board.groupSize);
  const weights = board.cells.map(() => 0);
  let cell,
    cellIndex,
    cellValue = 0;
  for (let cellGroup of cellGroups(board)) {
    const counts = {
      [BLACK_PIECE]: 0,
      [EMPTY_CELL]: 0,
      [WHITE_PIECE]: 0,
    };
    for (cell of Object.values(cellGroup)) {
      counts[cell.contents] += 1;
    }
    if (counts[opponent(colour)] > 0) {
      if (counts[colour] === 0) {
        cellValue = cellScores.threat[counts[EMPTY_CELL]];
      } else {
        cellValue = 0;
      }
    } else if (counts[colour] > 0) {
      cellValue = cellScores.opportunity[counts[EMPTY_CELL]];
    } else {
      cellValue = 1;
    }
    for ([cellIndex, cell] of Object.entries(cellGroup)) {
      if (cell.contents === EMPTY_CELL) {
        weights[cellIndex] += cellValue;
      } else {
        weights[cellIndex] -= 1;
      }
    }
  }
  const topScore = Math.max(...weights);
  const topCells = weights.reduce((acc, score, index) => score === topScore ? [...acc, index] : acc, []);
  const randomCell = Math.floor(Math.random() * topCells.length);
  return topCells[randomCell];
}

const className = 'local-random-robot-player',
  name = 'Random Bot (local)',
  shortName = 'localRandomRobot';

export default class LocalRobotPlayer extends PlayerController {
  getStatus() {
    return 'Waiting for winner';
  }

  async nextMove(board, playFunc) {
    playFunc(determineNextMove(board, this.weightFunction, this.props.colour));
  }

  static get className() {
    return className;
  }

  static get name() {
    return name;
  }

  static get shortName() {
    return shortName;
  }

  get weightFunction() {
    return generateCellScores;
  }
}
