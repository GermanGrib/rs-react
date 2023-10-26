import { Component, ReactElement } from 'react';
import styles from './errorBoundaryBody.module.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../router/constants';

class ErrorBoundaryBody extends Component {
  render(): ReactElement {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <p>Oh no! You broke everything!</p>
          <Link
            className={styles.link}
            onClick={(): void => window.location.reload()}
            to={paths.Home}
          >
            Thankfully, we have a frontend developer - just click the button,
            silly.
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorBoundaryBody;
