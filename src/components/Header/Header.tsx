import { Component, ReactElement } from 'react';
import styles from './header.module.scss';
import { SearchField } from '../SeatchField';

interface IHeaderProps {
  onSearch: () => Promise<void>;
  toggleLoading: (isLoading: boolean) => void;
}

class Header extends Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render(): ReactElement {
    return (
      <header className={styles.root}>
        <div>
          <SearchField
            onSearch={this.props.onSearch}
            toggleLoading={this.props.toggleLoading}
          />
        </div>
      </header>
    );
  }
}

export default Header;
