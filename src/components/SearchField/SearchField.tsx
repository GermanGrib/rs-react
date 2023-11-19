import React, { ReactElement, SyntheticEvent, useRef } from 'react';

import { userSearchValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useGetPokemonsQuery } from '../../services/rtkQuery/pokemonApi';
import { setSearchValue } from '../../store/slices/searchValueSlice';
import styles from './searchField.module.scss';

if (!localStorage.getItem(userSearchValue)) {
  localStorage.setItem(userSearchValue, '');
}

function SearchField(): ReactElement {
  const savedSearchValue = localStorage.getItem(userSearchValue) || '';
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const queryOptions = { name: storeSearchValue };
  const { isLoading: isLoadingPokemon, refetch: refetchPokemon } =
    useGetPokemonsQuery(queryOptions);

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    const searchRefValue = searchRef.current ? searchRef.current.value : '';
    e.preventDefault();
    dispatch(setSearchValue(searchRefValue));
    localStorage.setItem(userSearchValue, searchRefValue);
    refetchPokemon();
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
          disabled={isLoadingPokemon}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchField;
