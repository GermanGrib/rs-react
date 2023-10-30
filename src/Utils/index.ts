import { axios } from '../services/pokemonService';
import { POKEMON_URL } from '../services/pokemonService/variables';
import {
  ICardProps,
  IEachFullPokemonData,
  IPokemonData,
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
