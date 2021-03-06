import { newBoard } from '../components/Board';

export default function board(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_WIN_CONDITION':
      return newBoard(state.rows, action.groupSize);
    case 'PLAY_TURN':
      const { location, moveId, piece } = action;
      return {
        ...state,
        cells: updateCellsForTurn(state.cells, location, moveId, piece),
        handleCellClick: null,
      };
    case 'REQUIRE_HUMAN_INPUT':
      return {
        ...state,
        handleCellClick: action.callback,
      };
    case 'RESIZE_BOARD':
      return newBoard(action.size, state.groupSize);
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
