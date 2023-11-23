import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { DEFAULT_QUERY_CATALOG } from '../../../const';
import { DetailedCardFields } from '../../../types/interface';
import { NoInfo } from '../../NoInfo';
import styles from './detailedCard.module.scss';

interface DetailedCardProps {
  data: DetailedCardFields;
  errorMessage?: string;
}

function DetailedCard({ data }: DetailedCardProps): ReactElement {
  const router = useRouter();
  if (data === undefined) {
    return <NoInfo />;
  }

  const destroyComponent = (): void => {
    router.push({ pathname: '/', query: DEFAULT_QUERY_CATALOG });
  };

  const { name, sprites, weight, height, base_experience, types } = data;
  return (
    <div className={styles.root} data-testid="detailed-card">
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={sprites.front_default}
            alt="pokemon picture"
          />
        </div>
        <div>Name: {name}</div>
        <div>Weight: {weight}</div>
        <div>Height: {height}</div>
        <div>HP: {base_experience}</div>
        <ul className={styles.list}>
          {types.map((el) => (
            <li key={el.type.name}>Skill: {el.type.name}</li>
          ))}
        </ul>
        <button className={styles.button} onClick={destroyComponent}>
          Close detailed
        </button>
      </div>
    </div>
  );
}

export default DetailedCard;
