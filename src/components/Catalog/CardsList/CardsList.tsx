import { useRouter } from 'next/router';
import React, { ReactElement, useRef } from 'react';

import { PokemonGeneralResponse } from '../../../services/types/interface';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

interface CardsListProps {
  cardsData: PokemonGeneralResponse;
}

function CardsList({ cardsData }: CardsListProps): ReactElement {
  const listRef = useRef(null);
  const router = useRouter();
  const { query } = router;

  function handleListClick(): void {
    if (query.id) {
      delete query.id;
      router.push({ pathname: '/', query });
    }
  }

  return (
    <ul className={styles.list} onClick={handleListClick} ref={listRef}>
      {cardsData.results.map((el) => {
        return (
          <li key={el.name}>
            <Card name={el.name} id={el.name} />
          </li>
        );
      })}
    </ul>
  );
}

export default CardsList;
