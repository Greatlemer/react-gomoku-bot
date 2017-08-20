import PlayerController from './PlayerController';

const className = 'human-player',
  name = 'Human',
  shortName = 'human';

export default class HumanPlayer extends PlayerController {
  getStatus() {
    if (this.state.awaitingInput) {
      return 'Please select a move.';
    } else if (this.props.gameStarted) {
      return 'Waiting for opposition to move.';
    }
    return 'Waiting for game to begin';
  }

  async nextMove(board, playFunc) {
    this.setState({
      awaitingInput: true,
    });
    this.props.requireHumanInput((location) => {
      this.setState({
        awaitingInput: false,
      });
      playFunc(location);
    });
  }

  static get className() {
    return className;
  }

  static get name() {
    return name;
  }

  static get shortName() {
    return shortName;
  }
}
