import { ReactElement, useState } from 'react';

import { CallErrorBtn } from '../CallErrorBtn';
import { SearchField } from '../SearchField';
import styles from './header.module.scss';

function Header(): ReactElement {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('RS School Error task');
  }

  return (
    <header className={styles.root}>
      <CallErrorBtn onClick={(): void => setIsError(!isError)} />
      <SearchField />
    </header>
  );
}

export default Header;
