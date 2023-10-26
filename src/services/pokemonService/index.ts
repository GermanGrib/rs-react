import { MAIN_URL, POKEMON_SUFFIX } from './variables';
import { ICardProps, IPokemonData } from '../../types/interface';
import { pokemonDataForCards } from '../../Utils';
import { MAX_CARDS_PER_PAGE } from '../../const';

export async function getPokemonById(
  id: number = 1
): Promise<IPokemonData | void> {
  try {
    const response: Response = await fetch(
      `${MAIN_URL}${POKEMON_SUFFIX}/${id}`
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error('Can"t getPokemons');
  }
}

export async function fetchPokemons(): Promise<ICardProps[] | undefined> {
  const pokemonsData: ICardProps[] = [];
  if (localStorage.getItem('currentPage')) {
    const currentPage = Number(localStorage.getItem('currentPage'));

    if (currentPage) {
      const startId = (currentPage - 1) * MAX_CARDS_PER_PAGE + 1;
      const endId = currentPage * MAX_CARDS_PER_PAGE;

      for (let i = startId; i <= endId; i++) {
        try {
          const pokemon = await getPokemonById(i);
          if (pokemon) {
            const editedData = pokemonDataForCards(pokemon);
            if (editedData) {
              pokemonsData.push(editedData);
            }
          }
        } catch (error) {
          throw new Error('Error during fetchPokemons');
        }
      }
      return pokemonsData;
    }
  }
}

export async function getPokemonByName(
  searchName: string
): Promise<IPokemonData | void> {
  try {
    const response: Response = await fetch(
      `${MAIN_URL}${POKEMON_SUFFIX}/${searchName}`
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error('Can"t getPokemons');
  }
}
