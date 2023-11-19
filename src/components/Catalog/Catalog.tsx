import React, { ReactElement, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useGetPokemonsQuery } from '../../services/rtkQuery/pokemonApi';
import { setLoadingMainPage } from '../../store/slices/loadingMainPageSlice';
import { mapPokemonData } from '../../utils';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');
  const {
    data: pokemonApiData,
    isFetching: isLoadingPokemonData,
    isError: pokemonIsError,
  } = useGetPokemonsQuery({
    name: storeSearchValue || '',
    query: { limit, offset },
  });
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
