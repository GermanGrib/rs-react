import React, { Component, ReactElement } from 'react';

interface IStatsField {
  statsTitle: string;
  statsValue: string;
}

class StatsField extends Component<IStatsField> {
  render(): ReactElement {
    return (
      <div>
        <p>{this.props.statsTitle}</p>
        <p>{this.props.statsValue}</p>
      </div>
    );
  }
}

export default StatsField;
