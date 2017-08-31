import LocalRobotPlayer from './LocalRobotPlayer';

function generateCellScores(groupSize) {
  let emptyCells = groupSize - 1,
    score = 1,
    target = 'threat';
  const scores = {
    opportunity: {},
    threat: {},
  };
  while (emptyCells > 0) {
    // `4` directions a line can be made;
    // `groupSize` positions in the line;
    score = (4 * groupSize * score) + 1;
    scores[target][emptyCells] = score;
    if (target === 'opportunity') {
      emptyCells -= 1;
      target = 'threat';
    } else {
      target = 'opportunity';
    }
  }
  return scores;
}

const className = 'local-robot-player-v1',
  name = 'Bot (local) v1',
  shortName = 'localRobotV1';

export default class LocalRobotPlayerV1 extends LocalRobotPlayer {
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

  get weightFunction() {
    return generateCellScores;
  }
}
