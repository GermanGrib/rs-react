import { ReactElement } from 'react';

import styles from './callErrorBtn.module.scss';

interface ErrorBtnProps {
  onClick: () => void;
}

function CallErrorBtn({ onClick }: ErrorBtnProps): ReactElement {
  return (
    <button className={styles.btn} onClick={onClick}>
      !
    </button>
  );
}

export default CallErrorBtn;
