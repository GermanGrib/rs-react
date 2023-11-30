import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../router/const';
import styles from './Home.module.scss';
import wallpaper from '/homeWallpaper.jpg';

function Home(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <img className={styles.bgImage} src={wallpaper} alt="" />
      <div className={styles.buttonWrapper}>
        <Link to={paths.controlledform}>
          <button className={`${styles.conrolledBtn} ${styles.button}`}>
            CONTROLLED
          </button>
        </Link>
        <Link to={paths.uncontrolledform}>
          <button className={`${styles.unconrolledBtn} ${styles.button}`}>
            UNCONTROLLED
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
