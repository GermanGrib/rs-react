import React, { ReactElement } from 'react';

import styles from './loading.module.scss';

function Loading(): ReactElement {
  return (
    <div className={styles.root}>
      <div className={styles.content}>Loading...</div>
    </div>
  );
}

export default Loading;
