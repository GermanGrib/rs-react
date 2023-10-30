import { Component, ReactElement } from 'react';

import { CallErrorBtn } from '../CallErrorBtn';
import { SearchField } from '../SearchField';
import styles from './header.module.scss';

interface IHeaderProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

class Header extends Component<IHeaderProps> {
  state = {
    isError: false,
  };

  render(): ReactElement {
    if (this.state.isError) {
      throw new Error('RS School Error task');
    }

    return (
      <header className={styles.root}>
        <CallErrorBtn onClick={(): void => this.setState({ isError: true })} />
        <SearchField
          onSearch={this.props.onSearch}
          toggleLoading={this.props.toggleLoading}
        />
      </header>
    );
  }
}

export default Header;
