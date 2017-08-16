export function playTurn(location, moveId, piece) {
  return {
    location,
    moveId,
    piece,
    type: 'PLAY_TURN',
  };
}

export function resizeBoard(size) {
  return {
    size,
    type: 'RESIZE_BOARD',
  };
}

export function selectSquare(location, moveId) {
  return {
    location,
    moveId,
    type: 'SELECT_SQUARE',
  };
}
