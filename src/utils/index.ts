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

export function transformQueryParamToStringOrNull(
  queryParam: string | string[] | undefined
): string | null {
  if (queryParam) {
    if (Array.isArray(queryParam)) {
      return queryParam[0];
    } else if (typeof queryParam === 'string') {
      return queryParam;
    }
  }
  return null;
}
