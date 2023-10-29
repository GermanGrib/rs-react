import { ReactElement, useState } from 'react';

import { CallErrorBtn } from '../CallErrorBtn';
import { SearchField } from '../SearchField';
import styles from './header.module.scss';

interface IHeaderProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

function Header({ onSearch, toggleLoading }: IHeaderProps): ReactElement {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('RS School Error task');
  }

  return (
    <header className={styles.root}>
      <CallErrorBtn onClick={(): void => setIsError(!isError)} />
      <SearchField onSearch={onSearch} toggleLoading={toggleLoading} />
    </header>
  );
}

export default Header;
