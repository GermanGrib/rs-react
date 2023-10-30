import { MAX_CARDS_PER_PAGE } from '../const';
import { axios } from '../services/pokemonService';
import { POKEMON_URL } from '../services/pokemonService/variables';
import {
  ICardProps,
  IEachFullPokemonData,
  IPokemonData,
  IPokemonFullResponse,
} from '../types/interface';

export function pokemonDataForCards(fullData: IPokemonData): ICardProps {
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
): Promise<ICardProps[]> {
  const pokemonsData: ICardProps[] = [];

  if (Array.isArray(data)) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] === undefined) {
        break;
      }

      const pokemon: IEachFullPokemonData = await axios({
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
}: LoadDataProps): Promise<ICardProps[]> => {
  const searchValue = localStorage.getItem('searchValue') || '';

  if (!searchValue && searchValue.length === 0) {
    try {
      const response: IPokemonFullResponse = await axios({
        url: POKEMON_URL,
        options: {
          itemsLimit: MAX_CARDS_PER_PAGE,
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
      const data: IEachFullPokemonData = await axios({
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
