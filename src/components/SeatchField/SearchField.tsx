import { Component, ReactElement, SyntheticEvent } from 'react';
import styles from './searchField.module.scss';

interface SearchFieldState {
  searchValue: string;
}

interface SearchFieldProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

class SearchField extends Component<SearchFieldProps, SearchFieldState> {
  constructor(props: SearchFieldProps) {
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
      if (!e.target.value.length) {
        localStorage.setItem('searchValue', '');
        this.props.toggleLoading(true);
        this.props.onSearch();
      }
    }
  };

  handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (this.state) {
      localStorage.setItem('searchValue', this.state.searchValue);
      this.props.toggleLoading(true);
      this.props.onSearch();
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
