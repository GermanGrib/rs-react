import React, { ReactElement } from 'react';

import { PokemonGeneralResponse } from '../../services/types/interface';
import { Pagination } from '../Pagination';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

interface CatalogProps {
  pokemonData: PokemonGeneralResponse;
}

function Catalog({ pokemonData }: CatalogProps): ReactElement {
  return (
    <>
      <div>
        <Pagination />
        <div className={styles.root}>
          <CardsList cardsData={pokemonData} />
        </div>
      </div>
    </>
  );
}

export default Catalog;
