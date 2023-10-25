import { Component, ReactElement } from 'react';
import styles from './catalog.module.scss';
import { CardsList } from './CardsList';
import { fetchPokemons, getPokemonByName } from '../../services/pokemonService';
import { pokemonDataForCards } from '../../Utils';
import { Loading } from '../Loading';

class Catalog extends Component {
  state = {
    cardsData: [],
    isLoading: true,
  };

  async componentDidMount(): Promise<void> {
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
        return;
      }
    } else {
      this.setState({ cardsData: [], isLoading: false });
    }
  }

  render(): ReactElement {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className={styles.root}>
        <CardsList cardsData={this.state.cardsData} />
      </div>
    );
  }
}

export default Catalog;
