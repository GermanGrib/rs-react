import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { CardProps } from '../../../types/interface';
import styles from './card.module.scss';

function Card({ name, id }: CardProps): ReactElement {
  const router = useRouter();
  const href = router.asPath.replace(/\/([^/]+)\?/, '/?');

  return (
    <Link href={`${id}${href}`} className={styles.profile}>
      <div className={styles.profileImage}>
        <img className={styles.img} src="/pokemon.webp" alt="card image" />
      </div>
      <h2 className={styles.profileUsername}>{name}</h2>
      <button>Detailed info</button>
    </Link>
  );
}

export default Card;
