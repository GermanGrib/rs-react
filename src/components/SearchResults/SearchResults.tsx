import { Component, ReactElement } from 'react';
import styles from './searchResults.module.scss';

class SearchResults extends Component {
  render(): ReactElement {
    return (
      <div className={styles.root}>
        <div>Body</div>
      </div>
    );
  }
}

export default SearchResults;
