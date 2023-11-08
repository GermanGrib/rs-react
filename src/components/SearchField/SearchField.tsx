import React, {
  ReactElement,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';

import { loadData } from '../../Utils';
import { locSearchValue } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import styles from './searchField.module.scss';

if (!localStorage.getItem(locSearchValue)) {
  localStorage.setItem(locSearchValue, '');
}

function SearchField(): ReactElement {
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const savedSearchValue = localStorage.getItem(locSearchValue) || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const localStorageSearchValue = localStorage.getItem(locSearchValue);

    if (localStorageSearchValue === searchValue) {
      return;
    }

    try {
      setIsPokemonLoading(true);
      localStorage.setItem(locSearchValue, searchValue);
      const pokemonData = await loadData({ offset: 0 });
      setPokemonData(pokemonData);
    } catch {
      setPokemonData([]);
    } finally {
      setIsPokemonLoading(false);
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
