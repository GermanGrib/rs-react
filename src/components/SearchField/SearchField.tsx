import { useRouter } from 'next/router';
import React, { ReactElement, SyntheticEvent, useRef } from 'react';

import { DEFAULT_QUERY_CATALOG, userSearchValue } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSearchValue } from '../../store/slices/searchValueSlice';
import styles from './searchField.module.scss';

function SearchField(): ReactElement {
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    const searchRefValue = searchRef.current ? searchRef.current.value : '';
    e.preventDefault();
    dispatch(setSearchValue(searchRefValue));
    localStorage.setItem(userSearchValue, searchRefValue);
    if (searchRefValue === '') {
      router.push({
        pathname: '/',
        query: DEFAULT_QUERY_CATALOG,
      });
      return;
    }
    router.push({
      pathname: '/searchResult',
      query: {
        searchValue: searchRefValue,
      },
    });
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
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchField;
