import { Component, ReactElement } from 'react';

import { ICardProps } from '../../../types/interface';
import { NoInfo } from '../../NoInfo';
import { Card } from '../Card';
import styles from './cardsList.module.scss';

// function CardsList(cardsData: ICardProps[] | []): ReactElement {
//   const isCardsDataEmpty = Array.isArray(cardsData) && cardsData.length === 0;
//   return (
//     <ul className={styles.list}>
//       {!isCardsDataEmpty &&
//         cardsData.map((el) => {
//           const { cardTitle, imgSrc, weight, height, experience, id } = el;
//           return (
//             <li key={id}>
//               <Card
//                 cardTitle={cardTitle}
//                 imgSrc={imgSrc}
//                 weight={weight}
//                 height={height}
//                 experience={experience}
//               />
//             </li>
//           );
//         })}
//       {isCardsDataEmpty && <NoInfo />}
//     </ul>
//   );
// }

class CardsList extends Component<{ cardsData: ICardProps[] }> {
  renderCards(): ReactElement {
    const isCardsDataEmpty =
      Array.isArray(this.props.cardsData) && this.props.cardsData.length === 0;
    return (
      <>
        {!isCardsDataEmpty &&
          this.props.cardsData.map((el) => {
            const { cardTitle, imgSrc, weight, height, experience, id } = el;
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
      </>
    );
  }

  render(): ReactElement {
    return <ul className={styles.list}>{this.renderCards()}</ul>;
  }
}

export default CardsList;
