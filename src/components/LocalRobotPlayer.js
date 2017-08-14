import PlayerController from './PlayerController';

const className = 'local-robot-player',
  name = 'Bot (local)',
  shortName = 'localRobot';

export default class LocalRobotPlayer extends PlayerController {
  getStatus() {
    return 'Waiting for opposition';
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
