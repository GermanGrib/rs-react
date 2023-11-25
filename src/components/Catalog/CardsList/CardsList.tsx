import React, { ReactElement } from 'react';

import { PokemonGeneralResponse } from '../../../services/types/interface';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

interface CardsListProps {
  cardsData: PokemonGeneralResponse;
  // isCardsDataError: boolean;
  // setIsDetailedOpen: Dispatch<SetStateAction<boolean>>;
  // isDetailedOpen: boolean;
}

function CardsList({
  cardsData, // isCardsDataError,
  // isDetailedOpen,
} // setIsDetailedOpen,
: CardsListProps): ReactElement {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   if (searchParams.size === 0) {
  //     setIsDetailedOpen(false);
  //   }
  // }, [searchParams]);

  // function handleItemClick(): void {
  //   if (!isDetailedOpen) {
  //     setIsDetailedOpen(true);
  //   }
  // }
  //
  // function handleListClick(): void {
  //   if (isDetailedOpen) {
  //     setIsDetailedOpen(false);
  //   }
  // }

  return (
    <ul className={styles.list} onClick={(): void => {}}>
      {cardsData.results.map((el) => {
        return (
          <li key={el.name} onClick={(): void => {}}>
            <Card name={el.name} id={el.name} />
          </li>
        );
      })}
      {/*{isCardsDataError && <NoInfo />}*/}
    </ul>
  );
}

export default CardsList;
