import { ReactElement, useState } from 'react';

import styles from './callErrorBtn.module.scss';

function CallErrorBtn(): ReactElement {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('RS School Error task');
  }

  return (
    <button className={styles.btn} onClick={(): void => setIsError(!isError)}>
      !
    </button>
  );
}

export default CallErrorBtn;
