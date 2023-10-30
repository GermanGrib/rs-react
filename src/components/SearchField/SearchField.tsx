import { ReactElement, SyntheticEvent, useContext, useState } from 'react';

import { loadData } from '../../Utils';
import CurrentPageContext from '../../context/PagesProvider';
import PokemonDataContext from '../../context/PokemonProvider';
import styles from './searchField.module.scss';

if (!localStorage.getItem('searchValue')) {
  localStorage.setItem('searchValue', '');
}

function SearchField(): ReactElement {
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const { currentPage } = useContext(CurrentPageContext);
  const savedSearchValue = localStorage.getItem('searchValue') || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const localStorageSearchValue = localStorage.getItem('searchValue');

    if (localStorageSearchValue === searchValue) {
      return;
    }

    try {
      setIsPokemonLoading(true);
      localStorage.setItem('searchValue', searchValue);
      const pokemonData = await loadData({ pageNumber: currentPage });
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
