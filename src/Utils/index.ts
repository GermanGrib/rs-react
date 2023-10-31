import { MAX_CARDS_PER_PAGE } from '../const';
import { axios } from '../services/pokemonService';
import { POKEMON_URL } from '../services/pokemonService/variables';
import {
  FetchData,
  ICard,
  IPokemonData,
  IPokemonFullResponse,
} from '../types/interface';

if (!sessionStorage.getItem('max-pages')) {
  sessionStorage.setItem('max-pages', String(MAX_CARDS_PER_PAGE));
}

if (!sessionStorage.getItem('currentPage')) {
  sessionStorage.setItem('currentPage', '1');
}

export function pokemonDataForCards(fullData: IPokemonData): ICard {
  const { name, weight, height, base_experience, id, sprites } = fullData;

  return {
    cardTitle: name,
    weight,
    height,
    experience: base_experience,
    id,
    imgSrc: sprites.front_default,
  };
}

export async function listDataForCards(
  data: { name: string; url: string }[]
): Promise<ICard[]> {
  const pokemonsData: ICard[] = [];

  if (Array.isArray(data)) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] === undefined) {
        break;
      }

      const pokemon: IPokemonData = await axios({
        url: POKEMON_URL,
        options: {
          searchString: data[i].name,
        },
      });
      if (pokemon) {
        const editedData = pokemonDataForCards(pokemon);
        if (editedData) {
          pokemonsData.push(editedData);
        }
      }
    }
  }

  return pokemonsData;
}

interface LoadDataProps {
  pageNumber: number;
}

export const loadData = async ({
  pageNumber,
}: LoadDataProps): Promise<ICard[]> => {
  const searchValue = localStorage.getItem('searchValue') || '';
  const MAX_CARDS_PER_PAGE = sessionStorage.getItem('max-pages');

  if (!searchValue && searchValue.length === 0) {
    try {
      const response: IPokemonFullResponse = await axios({
        url: POKEMON_URL,
        options: {
          itemsLimit: Number(MAX_CARDS_PER_PAGE),
          pageNumber,
        },
      });
      const { results } = response;
      return await listDataForCards(results);
    } catch {
      throw new Error('While loading data:');
    }
  } else if (searchValue) {
    try {
      const data: IPokemonData = await axios({
        url: POKEMON_URL,
        options: {
          searchString: searchValue,
        },
      });
      return [pokemonDataForCards(data)];
    } catch {
      throw new Error('While loading data:');
    }
  }
  return [];
};

export async function fetchData({
  page = 1,
  setIsPokemonLoading,
  setPokemonData,
}: FetchData): Promise<void> {
  try {
    setIsPokemonLoading(true);
    const data = await loadData({ pageNumber: page });
    setPokemonData(data);
    sessionStorage.setItem('currentPage', String(page));
  } catch {
    return;
  } finally {
    setIsPokemonLoading(false);
  }
}
