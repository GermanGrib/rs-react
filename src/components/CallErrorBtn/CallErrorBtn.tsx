import { ReactElement } from 'react';

import styles from './callErrorBtn.module.scss';

interface ICallErrorBtn {
  onClick: () => void;
}

function CallErrorBtn({ onClick }: ICallErrorBtn): ReactElement {
  return (
    <button className={styles.btn} onClick={onClick}>
      !
    </button>
  );
}

export default CallErrorBtn;
