import { Component, ReactElement } from 'react';
import styles from './header.module.scss';
import { SearchField } from '../SeatchField';

class Header extends Component {
  render(): ReactElement {
    return (
      <header className={styles.root}>
        <div>
          <SearchField />
        </div>
      </header>
    );
  }
}

export default Header;
