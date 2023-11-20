import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { CardProps } from '../../../types/interface';
import styles from './card.module.scss';

function Card({ name, id }: CardProps): ReactElement {
  return (
    <Link to={`?detailed=${id}`} className={styles.profile}>
      <div className={styles.profileImage}>
        <img className={styles.img} src="/pokemon.webp" alt="card image" />
      </div>
      <h2 className={styles.profileUsername}>{name}</h2>
      <button>Detailed info</button>
    </Link>
  );
}

export default Card;
