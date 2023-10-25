import { Component, ReactElement } from 'react';
import styles from './loading.module.scss';

class Loading extends Component {
  render(): ReactElement {
    return (
      <div className={styles.root}>
        <div className={styles.content}>Loading...</div>
      </div>
    );
  }
}

export default Loading;
