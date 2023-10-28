import { Component, ReactElement } from 'react';

import styles from './callErrorBtn.module.scss';

interface ICallErrorBtn {
  onClick: () => void;
}

class CallErrorBtn extends Component<ICallErrorBtn> {
  render(): ReactElement {
    return (
      <button className={styles.btn} onClick={this.props.onClick}>
        !
      </button>
    );
  }
}

export default CallErrorBtn;
