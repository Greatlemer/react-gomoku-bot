import LocalRobotPlayer from './LocalRobotPlayer';

function generateCellScores(groupSize) {
  let emptyCells = groupSize - 1,
    score = 1,
    target = 'threat';
  const scores = {
    opportunity: {},
    threat: {},
  };
  while (emptyCells > 2) {
    // Be more attacking, prioritise creating opportunities over blocking.
    if (target === 'threat') {
      score = (0.8 * (groupSize - emptyCells) * score / groupSize);
    } else {
      // `4` directions a line can be made;
      // `groupSize` positions in the line;
      score = (4 * groupSize * score) + 1;
    }
    scores[target][emptyCells] = score;
    if (target === 'opportunity') {
      emptyCells -= 1;
      target = 'threat';
    } else {
      target = 'opportunity';
    }
  }

  while (emptyCells > 0) {
    score = (4 * groupSize * score) + 1;
    scores['threat'][emptyCells] = score;
    score = (4 * groupSize * score) + 1;
    scores['opportunity'][emptyCells] = score;
    emptyCells -= 1;
  }
  return scores;
}

const className = 'local-robot-player-v4',
  name = 'Bot (local) v4',
  shortName = 'localRobotV4';

export default class LocalRobotPlayerV4 extends LocalRobotPlayer {
  getStatus() {
    return 'Waiting for oppo';
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
