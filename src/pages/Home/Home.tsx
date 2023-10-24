import { Component, ReactElement } from 'react';
import { Header } from '../../components/Header';
import { Catalog } from '../../components/Catalog';
import styles from './home.module.scss';

class Home extends Component {
  render(): ReactElement {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <Catalog />
        </main>
      </>
    );
  }
}

export default Home;
