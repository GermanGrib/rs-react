import React, { ReactElement } from 'react';

import { CallErrorBtn } from '../CallErrorBtn';
import { SearchField } from '../SearchField';
import styles from './header.module.scss';

function Header(): ReactElement {
  return (
    <header className={styles.root}>
      <CallErrorBtn />
      <SearchField />
    </header>
  );
}

export default Header;
