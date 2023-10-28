import { Component, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './errorBoundaryBody.module.scss';

class ErrorBoundaryBody extends Component {
  render(): ReactElement {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <p>Oh no! You broke everything!</p>
          <Link
            className={styles.link}
            onClick={(): void => window.location.reload()}
            to="/"
          >
            Thankfully, we have a Frontend developer - just click on me, silly.
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorBoundaryBody;
