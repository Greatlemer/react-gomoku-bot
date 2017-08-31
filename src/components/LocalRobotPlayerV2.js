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
    // Be more defensive, prioritise blocking over creating opportunities.
    if (target === 'opportunity' && emptyCells > 1) {
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
  return scores;
}

const className = 'local-robot-player-v2',
  name = 'Bot (local) v2',
  shortName = 'localRobotV2';

export default class LocalRobotPlayerV2 extends LocalRobotPlayer {
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
