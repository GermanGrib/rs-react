import { PokemonGeneralResponse } from '../services/types/interface';
import { CardProps, DetailedCardProps } from '../types/interface';

export function mapPokemonData(
  data: PokemonGeneralResponse | DetailedCardProps | undefined
): CardProps[] | [DetailedCardProps] {
  if (data === undefined) {
    return [];
  }

  if ('results' in data) {
    return data.results;
  } else {
    return [data];
  }
}
