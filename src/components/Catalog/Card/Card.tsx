import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../../router/const';
import { ICard } from '../../../types/interface';
import { StatsField } from './StatsField';
import styles from './card.module.scss';

function Card(props: ICard): ReactElement {
  const { cardTitle, imgSrc, weight, height, experience, id } = props;

  return (
    <Link to={`${paths.home}${id}`} className={styles.profile}>
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
    </Link>
  );
}

export default Card;
