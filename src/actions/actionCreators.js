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
