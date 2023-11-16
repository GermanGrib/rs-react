import React, { ReactElement, SyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { loadData } from '../../Utils';
import { userSearchValue } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { paths } from '../../router/const';
import { setSearchValue } from '../../store/slices/searchValueSlice';
import styles from './searchField.module.scss';

if (!localStorage.getItem(userSearchValue)) {
  localStorage.setItem(userSearchValue, '');
}

function SearchField(): ReactElement {
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const savedSearchValue = localStorage.getItem(userSearchValue) || '';
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();

    if (savedSearchValue === '') {
      navigate(paths.home);
    }

    if (storeSearchValue === savedSearchValue) {
      return;
    }

    try {
      localStorage.setItem(userSearchValue, storeSearchValue);
      dispatch(setSearchValue(storeSearchValue));
      setIsPokemonLoading(true);
      const pokemonData = await loadData({
        offset: 0,
        searchValue: storeSearchValue,
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
          onChange={(e): void => {
            dispatch(setSearchValue(e.target.value));
          }}
          value={storeSearchValue}
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
