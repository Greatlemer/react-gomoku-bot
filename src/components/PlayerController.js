import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerController extends Component {
  constructor() {
    super();

    this.handleGameTick = this.handleGameTick.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.nextMove = this.nextMove.bind(this);

    this.state = {
      playingMove: false,
    }
  }

  componentDidMount() {
    this.context.loop.subscribe(this.handleGameTick);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.handleGameTick);
  }

  handleGameTick() {
    const moveNumber = this.props.nextMoveNumber;
    if (this.props.isWaitingForMove && this.state.playingMove !== moveNumber) {
      this.setState({
        playingMove: moveNumber,
      });
      this.nextMove(this.props.board, this.props.playMove);
    } else if(!this.props.isWaitingForMove && this.state.playingMove) {
      this.setState({
        playingMove: false,
      });
    }
  }

  async nextMove(board, playFunc) {
    playFunc(1);
  }

  getStatus() {
    return 'Implement me!';
  }

  render() {
    return <p className='unknown-player'>{this.getStatus()}</p>
  }
}

PlayerController.contextTypes = {
  loop: PropTypes.object,
}

export default PlayerController;
