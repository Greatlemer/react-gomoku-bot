export function changeWinCondition(groupSize) {
  return {
    groupSize: parseInt(groupSize, 10),
    type: 'CHANGE_WIN_CONDITION',
  }
}

export function highlightWin(winningCells) {
  return {
    type: 'HIGHLIGHT_WIN',
    winningCells: winningCells.map(val => parseInt(val, 10)),
  };
}

export function playTurn(location, moveId, piece) {
  return {
    location,
    moveId,
    piece,
    type: 'PLAY_TURN',
  };
}

export function requireHumanInput(callback) {
  return {
    callback,
    type: 'REQUIRE_HUMAN_INPUT',
  }
}

export function resizeBoard(size) {
  return {
    size: parseInt(size, 10),
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
