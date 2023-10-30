import { ReactElement } from 'react';

import { ICardProps } from '../../../types/interface';
import { NoInfo } from '../../NoInfo';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

interface CardsListProps {
  cardsData: ICardProps[];
}

function CardsList({ cardsData }: CardsListProps): ReactElement {
  const isCardsDataEmpty = Array.isArray(cardsData) && cardsData.length === 0;

  return (
    <ul className={styles.list}>
      {!isCardsDataEmpty &&
        cardsData.map((el) => {
          const { id, cardTitle, imgSrc, weight, height, experience } = el;
          return (
            <li key={id}>
              <Card
                cardTitle={cardTitle}
                imgSrc={imgSrc}
                weight={weight}
                height={height}
                experience={experience}
              />
            </li>
          );
        })}
      {isCardsDataEmpty && <NoInfo />}
    </ul>
  );
}

export default CardsList;
