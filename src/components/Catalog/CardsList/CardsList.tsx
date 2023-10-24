import { Component, ReactElement } from 'react';
import { Card } from '../Card';
import { ICardProps } from '../../../types/interface';
import styles from './cardsList.module.scss';

class CardsList extends Component<{ cardsData: ICardProps[] }> {
  renderCards(): ReactElement {
    return (
      <>
        {this.props.cardsData.map((el) => {
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
        ;
      </>
    );
  }

  render(): ReactElement {
    return <ul className={styles.list}>{this.renderCards()}</ul>;
  }
}

export default CardsList;
