import React, { Component } from 'react';

import { selectRandomEmptyCell } from './Board';
import { BLACK_PIECE, WHITE_PIECE } from './Cell';
import HumanPlayer from './HumanPlayer';
import LocalRobotPlayer from './LocalRobotPlayer';

import './Player.css';

const playerTypes = [
  LocalRobotPlayer,
  HumanPlayer,
];

export default class Player extends Component {
  constructor() {
    super();

    this.playerChoices = {};
    for (const playerType of playerTypes) {
      this.playerChoices[playerType.shortName] = {
        component: playerType,
        name: playerType.name,
      }
    }

    this.handlePlayerChooserChange = this.handlePlayerChooserChange.bind(this);
    this.nextMove = this.nextMove.bind(this);
    this.renderPlayerChooser = this.renderPlayerChooser.bind(this);

    this.state = {
      playerController: this.playerChoices[playerTypes[0].shortName].component,
    }
  }

  renderPlayerChooser() {
    return (
      <select ref={input => this.player_type = input} onChange={this.handlePlayerChooserChange}>
        {
          Object.entries(this.playerChoices).map(
            ([key, obj]) => <option key={key} value={key}>{obj.name}</option>
          )
        }
      </select>
    )
  }

  handlePlayerChooserChange() {
    this.setState({
      ...this.state,
      playerController: this.playerChoices[this.player_type.value].component,
    });
  }

  nextMove(callback) {
    this.state.playerController.nextMove(this.props.board, callback);
  }

  render() {
    const Controller = this.state.playerController;
    const classes = ['player'];
    let colour = 'Unknown';
    if (this.props.colour === BLACK_PIECE) {
      colour = 'Black';
      classes.push('plays_as_black');
    } else if (this.props.colour === WHITE_PIECE) {
      colour = 'White';
      classes.push('plays_as_white');
    }
    return (
      <div className={classes.join(' ')}>
        <h3>Player {this.props.index}</h3>
        <h4>Colour</h4>
        <p>{colour}</p>
        <h4>Type</h4>
        <p>{this.renderPlayerChooser()}</p>
        <h4>Info</h4>
        <Controller
          board={this.props.board}
          colour={this.props.colour}
          isWaitingForMove={this.props.waitingForMove}
          nextMoveNumber={this.props.nextMoveNumber}
          playMove={this.props.playMove}
        />
      </div>
    )
  }
}
