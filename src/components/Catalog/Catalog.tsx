import React, { ReactElement, useEffect, useState } from 'react';

import { listDataForCards, pokemonDataForCards } from '../../Utils';
import { MAX_CARDS_PER_PAGE } from '../../const';
import { axios } from '../../services/pokemonService';
import { POKEMON_URL } from '../../services/pokemonService/variables';
import {
  ICardProps,
  IEachFullPokemonData,
  IPokemonFullResponse,
} from '../../types/interface';
import { Header } from '../Header';
import { Loading } from '../Loading';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const [cardsData, setCardsData] = useState<ICardProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    const searchValue = localStorage.getItem('searchValue') || '';

    if (!searchValue && searchValue.length === 0) {
      try {
        const response: IPokemonFullResponse = await axios({
          url: POKEMON_URL,
          options: {
            itemsLimit: MAX_CARDS_PER_PAGE,
            pageNumber,
          },
        });
        const { results } = response;
        const formattedData = await listDataForCards(results);
        setCardsData(formattedData);
        setIsLoading(false);
      } catch {
        setCardsData([]);
        setIsLoading(false);
      }
    } else if (searchValue) {
      try {
        const data: IEachFullPokemonData = await axios({
          url: POKEMON_URL,
          options: {
            searchString: searchValue,
          },
        });
        const formattedData = pokemonDataForCards(data);
        setCardsData([formattedData]);
        setIsLoading(false);
      } catch {
        setCardsData([]);
        setIsLoading(false);
      }
    }
  };

  const refreshData = async (): Promise<void> => {
    await loadData();
  };

  const toggleLoading = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  };

  if (isLoading) {
    return (
      <>
        <Header onSearch={refreshData} toggleLoading={toggleLoading} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header onSearch={refreshData} toggleLoading={toggleLoading} />
      <div className={styles.root}>
        <CardsList cardsData={cardsData} />
      </div>
    </>
  );
}

export default Catalog;
