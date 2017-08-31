import LocalRobotPlayer from './LocalRobotPlayer';

function generateCellScores(groupSize) {
  let emptyCells = groupSize - 1,
    score = 1,
    target = 'opportunity';
  const scores = {
    opportunity: {},
    threat: {},
  };
  while (emptyCells > 1) {
    // Mega defensive - blocking at a given level always prioritised over
    // creating an opportunity of the same level.
    // `4` directions a line can be made;
    // `groupSize` positions in the line;
    score = (4 * groupSize * score) + 1;
    scores[target][emptyCells] = score;
    if (target === 'opportunity') {
      target = 'threat';
    } else {
      target = 'opportunity';
      emptyCells -= 1;
    }
  }
  score = (4 * groupSize * score) + 1;
  scores['threat'][1] = score;
  score = (4 * groupSize * score) + 1;
  scores['opportunity'][1] = score;

  return scores;
}

const className = 'local-robot-player-v3',
  name = 'Bot (local) v3',
  shortName = 'localRobotV3';

export default class LocalRobotPlayerV3 extends LocalRobotPlayer {
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
