import { Component, ReactElement, SyntheticEvent } from 'react';
import styles from './searchField.module.scss';

interface SearchFieldState {
  searchValue: string;
}

class SearchField extends Component<unknown, SearchFieldState> {
  constructor(props: unknown) {
    super(props);
    const savedSearchValue = localStorage.getItem('searchValue') || '';

    this.state = {
      searchValue: savedSearchValue,
    };
  }

  handleInputChange = (e: SyntheticEvent): void => {
    if (e.target instanceof HTMLInputElement) {
      const newSearchValue = e.target.value;
      this.setState({ searchValue: newSearchValue });
      if (e.target.value.length === 0) {
        localStorage.setItem('searchValue', '');
      }
    }
  };

  handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (this.state) {
      localStorage.setItem('searchValue', this.state.searchValue);
    }
  };

  render(): ReactElement {
    return (
      <div className={styles.root}>
        <form
          className={styles.form}
          onSubmit={this.handleSubmit}
          role="search"
        >
          <label className={styles.label} htmlFor="search">
            Search for stuff
          </label>
          <input
            className={styles.input}
            onChange={this.handleInputChange}
            value={this.state.searchValue}
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
            required
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchField;
