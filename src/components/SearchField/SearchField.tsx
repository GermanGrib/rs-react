import React, { ReactElement, SyntheticEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { userSearchValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSearchValue } from '../../store/slices/searchValueSlice';
import styles from './searchField.module.scss';

if (!localStorage.getItem(userSearchValue)) {
  localStorage.setItem(userSearchValue, '');
}

function SearchField(): ReactElement {
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const isLoadingPokemon = useAppSelector(
    (state) => state.loadingMainPage.loadingMainPage
  );
  const [, setSearchParams] = useSearchParams();

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    const searchRefValue = searchRef.current ? searchRef.current.value : '';
    e.preventDefault();
    dispatch(setSearchValue(searchRefValue));
    localStorage.setItem(userSearchValue, searchRefValue);
    setSearchParams('');
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
          defaultValue={storeSearchValue}
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
