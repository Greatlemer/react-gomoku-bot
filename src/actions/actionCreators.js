export function playTurn(location, moveId, piece) {
  return {
    location,
    moveId,
    piece,
    type: 'PLAY_TURN',
  };
}
