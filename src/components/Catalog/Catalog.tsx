import { Component, ReactElement } from 'react';
import styles from './catalog.module.scss';
import { CardsList } from './CardsList';
import { fetchPokemons, getPokemonByName } from '../../services/pokemonService';
import { pokemonDataForCards } from '../../Utils';
import { Loading } from '../Loading';
import { Header } from '../Header';

class Catalog extends Component {
  state = {
    cardsData: [],
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue !== null && searchValue.length === 0) {
      try {
        const data = await fetchPokemons();
        if (data && Array.isArray(data)) {
          this.setState({ cardsData: data, isLoading: false });
        } else {
          console.error('Error fetching data: Invalid data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else if (searchValue) {
      const data = await getPokemonByName(searchValue);
      const editedData = pokemonDataForCards(data);
      if (editedData !== undefined) {
        this.setState({ cardsData: [editedData], isLoading: false });
      } else {
        this.setState({ cardsData: [], isLoading: false });
        return;
      }
    }
  }

  refreshData = async (): Promise<void> => {
    await this.loadData();
  };

  toggleLoading = (isLoading: boolean): void => {
    this.setState({ isLoading });
  };

  render(): ReactElement {
    if (this.state.isLoading) {
      return (
        <>
          <Header
            onSearch={this.refreshData}
            toggleLoading={this.toggleLoading}
          />
          <Loading />;
        </>
      );
    }

    return (
      <>
        <Header
          onSearch={this.refreshData}
          toggleLoading={this.toggleLoading}
        />
        <div className={styles.root}>
          <CardsList cardsData={this.state.cardsData} />
        </div>
      </>
    );
  }
}

export default Catalog;
