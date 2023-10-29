import { ReactElement, SyntheticEvent, useState } from 'react';

import styles from './searchField.module.scss';

interface SearchFieldProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

if (!localStorage.getItem('searchValue')) {
  localStorage.setItem('searchValue', '');
}

function SearchField({
  toggleLoading,
  onSearch,
}: SearchFieldProps): ReactElement {
  const savedSearchValue = localStorage.getItem('searchValue') || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    const localStorageSearchValue = localStorage.getItem('searchValue');

    if (localStorageSearchValue === searchValue) {
      return;
    }

    if (localStorageSearchValue !== null) {
      localStorage.setItem('searchValue', searchValue.trim());
      toggleLoading(true);
      onSearch();
    }
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit} role="search">
        <label className={styles.label} htmlFor="search">
          Search for stuff
        </label>
        <input
          className={styles.input}
          onChange={(e): void => setSearchValue(e.target.value)}
          value={searchValue}
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchField;
