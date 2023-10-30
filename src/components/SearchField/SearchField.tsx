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

  handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const searchValue = localStorage.getItem('searchValue') as string;
    const currentInputValue = this.state.searchValue;

    if (this.state) {
      if (currentInputValue === searchValue) {
        return;
      }

      localStorage.setItem('searchValue', currentInputValue.trim());
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
            onChange={(e): void =>
              this.setState({ searchValue: e.target.value })
            }
            value={this.state.searchValue}
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
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
