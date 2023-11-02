import { ReactElement } from 'react';

import { paths } from '../../../router/const';
import styles from './errorBoundaryBody.module.scss';

interface ErrorBodyProps {
  error: Error | null;
}

function ErrorBoundaryBody({ error }: ErrorBodyProps): ReactElement {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <p>Oh no! You broke everything!</p>
        <div className={styles.errorMsgContainer}>
          <h3 className={styles.errorTitle}>Error message</h3>
          <div className={styles.message}>{error?.message}</div>
        </div>
        <a
          className={styles.link}
          onClick={(): void => window.location.reload()}
          href={paths.home}
        >
          Thankfully, we have a Frontend developer - just click on me, silly.
        </a>
      </div>
    </div>
  );
}

export default ErrorBoundaryBody;
