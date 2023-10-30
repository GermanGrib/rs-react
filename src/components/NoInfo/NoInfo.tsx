import { Component, ReactElement } from 'react';

import styles from './noInfo.module.scss';

class NoInfo extends Component {
  render(): ReactElement {
    return (
      <div className={styles.root}>
        <div className={styles.content}>There is no data for this query</div>
      </div>
    );
  }
}

export default NoInfo;
