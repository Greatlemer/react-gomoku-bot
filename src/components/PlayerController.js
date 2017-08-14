import React, { Component } from 'react';

export default class PlayerController extends Component {
  constructor() {
    super();

    this.getStatus = this.getStatus.bind(this);
  }

  getStatus() {
    return 'Implement me!';
  }

  render() {
    return <p className='unknown-player'>{this.getStatus()}</p>
  }
}

