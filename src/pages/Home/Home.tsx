import { Component, ReactElement } from 'react';
import { Header } from '../../components/Header';
import { SearchResults } from '../../components/SearchResults';
import styles from './home.module.scss';

class Home extends Component {
  render(): ReactElement {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <SearchResults />
        </main>
      </>
    );
  }
}

export default Home;
