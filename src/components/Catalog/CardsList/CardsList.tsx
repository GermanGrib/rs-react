import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '../../../router/const';
import { CardProps, DetailedCardProps } from '../../../types/interface';
import { NoInfo } from '../../NoInfo';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

interface CardsListProps {
  cardsData: CardProps[] | DetailedCardProps[];
  isCardsDataError: boolean;
  setIsDetailedOpen: Dispatch<SetStateAction<boolean>>;
  isDetailedOpen: boolean;
}

function CardsList({
  cardsData,
  isCardsDataError,
  setIsDetailedOpen,
  isDetailedOpen,
}: CardsListProps): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size === 0) {
      setIsDetailedOpen(false);
    }
  }, [searchParams]);

  function handleItemClick(): void {
    if (!isDetailedOpen) {
      setIsDetailedOpen(true);
    }
  }

  function handleListClick(): void {
    if (isDetailedOpen) {
      setIsDetailedOpen(false);
      navigate(paths.home);
    }
  }

  return (
    <ul className={styles.list} onClick={handleListClick}>
      {!isCardsDataError &&
        cardsData.map((el) => {
          return (
            <li key={el.name} onClick={handleItemClick}>
              <Card name={el.name} id={el.name} />
            </li>
          );
        })}
      {isCardsDataError && <NoInfo />}
    </ul>
  );
}

export default CardsList;
