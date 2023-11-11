import {
  MAX_CARDS_PER_PAGE,
  maxItemsPerPage,
  totalResponseItems,
  userSearchValue,
} from '../const';
import { axios } from '../services/pokemonService';
import { POKEMON_URL } from '../services/pokemonService/variables';
import {
  CardProps,
  FetchData,
  IPokemonData,
  IPokemonFullResponse,
  QueryOptions,
} from '../types/interface';

if (!sessionStorage.getItem(maxItemsPerPage)) {
  sessionStorage.setItem(maxItemsPerPage, String(MAX_CARDS_PER_PAGE));
}

export function pokemonDataForCards(fullData: IPokemonData): CardProps {
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
): Promise<CardProps[]> {
  const pokemonsData: CardProps[] = [];

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
  offset: number;
  options?: QueryOptions;
  searchValue?: string;
}

export const loadData = async ({
  offset,
  options,
  searchValue,
}: LoadDataProps): Promise<CardProps[]> => {
  const localStorageSearchValue = localStorage.getItem(userSearchValue);
  const MAX_CARDS_PER_PAGE = sessionStorage.getItem(maxItemsPerPage);
  if (!localStorageSearchValue && (!searchValue || searchValue.length === 0)) {
    try {
      const response: IPokemonFullResponse = await axios({
        url: POKEMON_URL,
        options: {
          itemsLimit: options?.itemsLimit
            ? options.itemsLimit
            : String(MAX_CARDS_PER_PAGE),
          offset: options?.offset ? String(options.offset) : String(offset),
        },
      });
      sessionStorage.setItem(totalResponseItems, String(response.count));
      const { results } = response;
      return await listDataForCards(results);
    } catch {
      throw new Error('While loading data:');
    }
  } else if (localStorageSearchValue || searchValue) {
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
  offset = 0,
  setIsPokemonLoading,
  setPokemonData,
  options,
}: FetchData): Promise<void> {
  try {
    setIsPokemonLoading(true);
    const data = await loadData({ offset: offset, options });
    setPokemonData(data);
  } catch {
    return;
  } finally {
    setIsPokemonLoading(false);
  }
}
