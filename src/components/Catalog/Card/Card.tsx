import React, { Component, ReactElement } from 'react';
import styles from './card.module.scss';
import { StatsField } from './StatsField';
import { ICardProps } from '../../../types/interface';

class Card extends Component<ICardProps> {
  render(): ReactElement {
    const { cardTitle, imgSrc, weight, height, experience } = this.props;

    return (
      <article className={styles.profile}>
        <div className={styles.profileImage}>
          <img className={styles.img} src={imgSrc} alt="card image" />
        </div>
        <h2 className={styles.profileUsername}>{cardTitle}</h2>
        <small>Stats</small>
        <div className={styles.stats}>
          <StatsField statsTitle={'Weight'} statsValue={weight} />
          <StatsField statsTitle={'Height'} statsValue={height} />
          <StatsField statsTitle={'Base Exp'} statsValue={experience} />
        </div>
      </article>
    );
  }
}

export default Card;
