import { Component, ReactElement } from 'react';
import styles from './catalog.module.scss';
import { CardsList } from './CardsList';
import { fetchPokemons } from '../../services/pokemonService';

class Catalog extends Component {
  state = {
    cardsData: [],
  };

  async componentDidMount(): Promise<void> {
    try {
      const data = await fetchPokemons();
      if (data && Array.isArray(data)) {
        this.setState({ cardsData: data });
      } else {
        console.error('Error fetching data: Invalid data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render(): ReactElement {
    return (
      <div className={styles.root}>
        <CardsList cardsData={this.state.cardsData} />
      </div>
    );
  }
}

export default Catalog;
