import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import { DEFAULT_QUERY_CATALOG } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useGetPokemonsQuery } from '../../services/rtkQuery/pokemonApi';
import { setLoadingMainPage } from '../../store/slices/loadingMainPageSlice';
import { mapPokemonData, transformQueryParamToStringOrNull } from '../../utils';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import { DetailedCard } from './DetailedCard';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  const storeSearchValue = useAppSelector(
    (state) => state.searchValue.searchValue
  );
  const router = useRouter();
  const { limit, offset } = router.query;
  const newLimit = transformQueryParamToStringOrNull(limit);
  const newOffset = transformQueryParamToStringOrNull(offset);
  const {
    data: pokemonApiData,
    isFetching: isLoadingPokemonData,
    isError: pokemonIsError,
  } = useGetPokemonsQuery({
    name: storeSearchValue || '',
    query: { limit: newLimit, offset: newOffset },
  });
  const pokemonData = mapPokemonData(pokemonApiData);
  const dispatch = useAppDispatch();
  dispatch(setLoadingMainPage(isLoadingPokemonData));

  useEffect(() => {
    if (!limit) {
      router.push({
        query: {
          page: DEFAULT_QUERY_CATALOG.page,
          limit: DEFAULT_QUERY_CATALOG.limit,
          offset: DEFAULT_QUERY_CATALOG.offset,
        },
      });
    }
  }, []);

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
            {isDetailedOpen && <DetailedCard />}
          </div>
        </>
      )}
    </>
  );
}

export default Catalog;
