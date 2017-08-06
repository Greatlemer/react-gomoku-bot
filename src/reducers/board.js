export default function board(state = {}, action) {
  if (action.type === 'PLAY_TURN') {
    const { location, moveId, piece } = action;
    return {
      ...state,
      cells: updateCellsForTurn(state.cells, location, moveId, piece),
    };
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
