export default function board(state = {}, action) {
  if (action.type === 'PLAY_TURN') {
    const { location, moveId, piece } = action;
    const cells = [
      ...state.cells.slice(0, location),
      {
        contents: piece,
        moveId,
      },
      ...state.cells.slice(location + 1),
    ];
    return { ...state, cells };
  }
  return state
}
