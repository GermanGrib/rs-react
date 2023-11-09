import React, {
  ReactElement,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';

import { loadData } from '../../Utils';
import PokemonDataContext from '../../context/PokemonProvider';
import useSearchValueContext from '../../hooks/useSearchValueContext';
import styles from './searchField.module.scss';

function SearchField(): ReactElement {
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const { state, dispatch } = useSearchValueContext();
  const [searchValue, setSearchValue] = useState(state.searchValue || '');

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const savedSearchValue = state.searchValue;

    if (savedSearchValue === searchValue) {
      return;
    }

    try {
      setIsPokemonLoading(true);
      dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue });
      const pokemonData = await loadData({ offset: 0, searchValue });
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
