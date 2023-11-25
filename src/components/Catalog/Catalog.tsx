import React, { ReactElement } from 'react';

import { PokemonGeneralResponse } from '../../services/types/interface';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

interface CatalogProps {
  pokemonData: PokemonGeneralResponse;
}

function Catalog({ pokemonData }: CatalogProps): ReactElement {
  // console.log(pokemonData, 'IS IT HERE?');
  // const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  // const storeSearchValue = useAppSelector(
  //   (state) => state.searchValue.searchValue
  // );
  // const router = useRouter();
  // const { limit, offset } = router.query;
  // const newLimit = transformQueryParamToStringOrNull(limit);
  // const newOffset = transformQueryParamToStringOrNull(offset);
  // const {
  //   data: pokemonApiData,
  //   isFetching: isLoadingPokemonData,
  //   isError: pokemonIsError,
  // } = useGetPokemonsQuery({
  //   name: storeSearchValue || '',
  //   query: { limit: newLimit, offset: newOffset },
  // });
  // const pokemonData = mapPokemonData(pokemonApiData);
  // const dispatch = useAppDispatch();
  // dispatch(setLoadingMainPage(isLoadingPokemonData));

  // useEffect(() => {
  //   if (!limit) {
  //     router.push({
  //       query: {
  //         page: DEFAULT_QUERY_CATALOG.page,
  //         limit: DEFAULT_QUERY_CATALOG.limit,
  //         offset: DEFAULT_QUERY_CATALOG.offset,
  //       },
  //     });
  //   }
  // }, []);

  return (
    <>
      {/*{isLoadingPokemonData && <Loading />}*/}
      {<Pagination />}
      {
        <>
          <div className={styles.root}>
            <CardsList
              cardsData={pokemonData}
              // isCardsDataError={pokemonIsError}
              // setIsDetailedOpen={setIsDetailedOpen}
              // isDetailedOpen={isDetailedOpen}
            />
            {/*{isDetailedOpen && <DetailedCard />}*/}
          </div>
        </>
      }
    </>
  );
}

export default Catalog;
