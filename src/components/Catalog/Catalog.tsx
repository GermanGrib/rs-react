import { Component, ReactElement } from 'react';

import { listDataForCards, pokemonDataForCards } from '../../Utils';
import { MAX_CARDS_PER_PAGE } from '../../const';
import { axios } from '../../services/pokemonService';
import { POKEMON_URL } from '../../services/pokemonService/variables';
import {
  IEachFullPokemonData,
  IPokemonFullResponse,
} from '../../types/interface';
import { Header } from '../Header';
import { Loading } from '../Loading';
import { CardsList } from './CardsList';
import styles from './catalog.module.scss';

class Catalog extends Component {
  state = {
    cardsData: [],
    isLoading: true,
    pageNumber: 1,
  };

  async componentDidMount(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    const searchValue = localStorage.getItem('searchValue') ?? '';

    if (!searchValue && searchValue.length === 0) {
      try {
        const response: IPokemonFullResponse = await axios({
          url: POKEMON_URL,
          options: {
            itemsLimit: MAX_CARDS_PER_PAGE,
            pageNumber: this.state.pageNumber,
          },
        });
        const { results } = response;
        const formattedData = await listDataForCards(results);
        this.setState({ cardsData: formattedData, isLoading: false });
      } catch {
        this.setState({ cardsData: [], isLoading: false });
      }
    } else if (searchValue) {
      try {
        const data: IEachFullPokemonData = await axios({
          url: POKEMON_URL,
          options: {
            searchString: searchValue,
          },
        });
        const formattedData = pokemonDataForCards(data);
        this.setState({ cardsData: [formattedData], isLoading: false });
      } catch {
        this.setState({ cardsData: [], isLoading: false });
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
          <Loading />
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
