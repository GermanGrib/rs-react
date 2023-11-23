import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';

import styles from './callErrorBtn.module.scss';

function CallErrorBtn(): ReactElement {
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  if (isError) {
    router.push('/errorpage');
  }

  return (
    <button className={styles.btn} onClick={(): void => setIsError(!isError)}>
      !
    </button>
  );
}

export default CallErrorBtn;
