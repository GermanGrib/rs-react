import React, {
  ReactElement,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { loadData } from '../../Utils';
import { userSearchValue } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { paths } from '../../router/const';
import styles from './searchField.module.scss';

if (!localStorage.getItem(userSearchValue)) {
  localStorage.setItem(userSearchValue, '');
}

function SearchField(): ReactElement {
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const savedSearchValue = localStorage.getItem(userSearchValue) || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const localStorageSearchValue = localStorage.getItem(userSearchValue);

    if (searchValue === '') {
      navigate(paths.home);
    }

    if (localStorageSearchValue === searchValue) {
      return;
    }

    try {
      localStorage.setItem(userSearchValue, searchValue);
      setIsPokemonLoading(true);
      const pokemonData = await loadData({
        offset: 0,
        searchValue: searchValue,
      });
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
