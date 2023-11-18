import React, { ReactElement, SyntheticEvent, useContext, useRef } from 'react';

import { loadData } from '../../Utils';
import { userSearchValue } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSearchValue } from '../../store/slices/searchValueSlice';
import styles from './searchField.module.scss';

if (!localStorage.getItem(userSearchValue)) {
  localStorage.setItem(userSearchValue, '');
}

function SearchField(): ReactElement {
  const { isPokemonLoading, setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const savedSearchValue = localStorage.getItem(userSearchValue) || '';
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    const searchRefValue = searchRef.current ? searchRef.current.value : '';
    e.preventDefault();

    try {
      dispatch(setSearchValue(searchRefValue));
      localStorage.setItem(userSearchValue, searchRefValue);
      setIsPokemonLoading(true);
      const pokemonData = await loadData({
        offset: 0,
        searchValue: searchRefValue,
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
          ref={searchRef}
          defaultValue={savedSearchValue ? savedSearchValue : storeSearchValue}
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
          disabled={isPokemonLoading}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchField;
