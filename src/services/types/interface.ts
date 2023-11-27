import { CardProps } from '../../types/interface';

export interface PokemonGeneralResponse {
  results: CardProps[];
  count: number;
}

export interface DetailedCardResponse {
  name: string;
  weight: string;
  height: string;
  base_experience: string;
  id: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export type PokemonResponses = PokemonGeneralResponse | DetailedCardResponse;
