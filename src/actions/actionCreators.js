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

export function resetBoard(size) {
  return {
    type: 'RESET_BOARD',
  };
}

export function selectSquare(location, moveId) {
  return {
    location,
    moveId,
    type: 'SELECT_SQUARE',
  };
}

export function highlightWin(winningCells) {
  return {
    type: 'HIGHLIGHT_WIN',
    winningCells: winningCells.map(val => parseInt(val, 10)),
  };
}
