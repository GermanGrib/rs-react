import React, { ReactElement, useContext } from 'react';

import PokemonDataContext from '../../context/PokemonProvider';
import { Loading } from '../Loading';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

function Catalog(): ReactElement {
  const { pokemonData, isPokemonLoading } = useContext(PokemonDataContext);

  return (
    <>
      {isPokemonLoading && <Loading />}

      {!isPokemonLoading && (
        <>
          <div className={styles.root}>
            <CardsList cardsData={pokemonData} />
          </div>
        </>
      )}
    </>
  );
}

export default Catalog;
