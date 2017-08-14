import PlayerController from './PlayerController';

const className = 'human-player',
  name = 'Human',
  shortName = 'human';

export default class HumanPlayer extends PlayerController {
  getStatus() {
    return 'Waiting for game to begin';
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
