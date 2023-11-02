import React, { ReactElement } from 'react';

import styles from './noInfo.module.scss';

function NoInfo(): ReactElement {
  return (
    <div className={styles.root}>
      <div className={styles.content}>There is no data for this query</div>
    </div>
  );
}

export default NoInfo;
