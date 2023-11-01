import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { locSearchValue } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const { pokemonData, isPokemonLoading } = useContext(PokemonDataContext);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  const isLocSearchValueEpmty = localStorage.getItem(locSearchValue) === '';

  useEffect(() => {
    if (!isPokemonLoading) {
      setInitialLoadComplete(true);
    }
  }, [isPokemonLoading]);

  return (
    <>
      {isPokemonLoading && <Loading />}
      {initialLoadComplete && (
        <Pagination isLocSearchValueEpmty={isLocSearchValueEpmty} />
      )}
      {!isPokemonLoading && (
        <>
          <div className={styles.root}>
            <CardsList
              cardsData={pokemonData}
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
