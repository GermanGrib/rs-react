import { Component, ReactElement } from 'react';
import styles from './header.module.scss';
import { SearchField } from '../SearchField';
import { CallErrorBtn } from '../CallErrorBtn';

interface IHeaderProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

class Header extends Component<IHeaderProps> {
  state = {
    isError: false,
  };

  constructor(props: IHeaderProps) {
    super(props);
  }

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
