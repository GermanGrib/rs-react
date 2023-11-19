import React, { ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { userSearchValue } from '../../const';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useGetPokemonsQuery } from '../../services/rtkQuery/pokemonApi';
import { setLoadingMainPage } from '../../store/slices/loadingMainPageSlice';
import { mapPokemonData } from '../../utils';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  const localStorageSearchValue = localStorage.getItem(userSearchValue);
  const {
    data: pokemonApiData,
    isFetching: isLoadingPokemonData,
    isError: pokemonIsError,
  } = useGetPokemonsQuery({ name: localStorageSearchValue || '' });
  const pokemonData = mapPokemonData(pokemonApiData);
  const dispatch = useAppDispatch();
  dispatch(setLoadingMainPage(isLoadingPokemonData));

  return (
    <>
      {isLoadingPokemonData && <Loading />}
      {!isLoadingPokemonData && <Pagination />}
      {!isLoadingPokemonData && (
        <>
          <div className={styles.root}>
            <CardsList
              cardsData={pokemonData}
              isCardsDataError={pokemonIsError}
              setIsDetailedOpen={setIsDetailedOpen}
              isDetailedOpen={isDetailedOpen}
            />
            {isDetailedOpen && <Outlet />}
          </div>
        </>
      )}
    </>
  );
}

export default Catalog;
