import { newBoard } from '../components/Board';

export default function board(state = {}, action) {
  if (action.type === 'PLAY_TURN') {
    const { location, moveId, piece } = action;
    return {
      ...state,
      cells: updateCellsForTurn(state.cells, location, moveId, piece),
    };
  } else if (action.type === 'RESIZE_BOARD') {
    return newBoard(parseInt(action.size, 10));
  } else if (action.type === 'RESET_BOARD') {
    return newBoard(state.rows, state.groupSize);
  }
  return state;
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
