import { Dispatch, ReactElement, SetStateAction } from 'react';

import { ICard } from '../../../types/interface';
import { NoInfo } from '../../NoInfo';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

interface CardsListProps {
  cardsData: ICard[];
  setIsDetailedOpen: Dispatch<SetStateAction<boolean>>;
  isDetailedOpen: boolean;
}

function CardsList({
  cardsData,
  setIsDetailedOpen,
  isDetailedOpen,
}: CardsListProps): ReactElement {
  const isCardsDataEmpty = Array.isArray(cardsData) && cardsData.length === 0;

  function handleItemClick(): void {
    if (!isDetailedOpen) {
      setIsDetailedOpen(true);
    }
  }

  function handleListClick(): void {
    if (isDetailedOpen) {
      setIsDetailedOpen(false);
    }
  }

  return (
    <ul className={styles.list} onClick={handleListClick}>
      {!isCardsDataEmpty &&
        cardsData.map((el) => {
          const { id, cardTitle, imgSrc, weight, height, experience } = el;
          return (
            <li key={id} onClick={handleItemClick}>
              <Card
                id={id}
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
