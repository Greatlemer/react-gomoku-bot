import { newBoard } from '../components/Board';

export default function board(state = {}, action) {
  switch (action.type) {
    case 'PLAY_TURN':
      const { location, moveId, piece } = action;
      return {
        ...state,
        cells: updateCellsForTurn(state.cells, location, moveId, piece),
      };
    case 'RESIZE_BOARD':
      return newBoard(parseInt(action.size, 10));
    case 'RESET_BOARD':
      return newBoard(state.rows, state.groupSize);
    case 'HIGHLIGHT_WIN':
      return {
        ...state,
        winningCells: [...action.winningCells],
      };
    default:
      return state;
  }
}

function updateCellsForTurn(cells, location, moveId, piece) {
  return [
    ...cells.slice(0, location),
    {
      contents: piece,
      moveId,
    },
    ...cells.slice(location + 1),
  ];
}
