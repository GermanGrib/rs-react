import React, { ReactElement } from 'react';

interface IStatsField {
  statsTitle: string;
  statsValue: string;
}

function StatsField({ statsTitle, statsValue }: IStatsField): ReactElement {
  return (
    <div>
      <p>{statsTitle}</p>
      <p>{statsValue}</p>
    </div>
  );
}

export default StatsField;
