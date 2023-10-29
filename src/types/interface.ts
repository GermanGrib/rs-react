export interface ICardProps {
  cardTitle: string;
  imgSrc: string;
  weight: string;
  height: string;
  experience: string;
  id?: string | number;
}

interface ISprites {
  front_default: string;
}

export interface IPokemonData {
  name: string;
  weight: string;
  height: string;
  base_experience: string;
  id: string;
  sprites: ISprites;
}

export interface IPokemonFullResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: { name: string; url: string }[];
}

export interface IEachFullPokemonData extends IPokemonData {
  abilities: unknown;
  forms: unknown;
  game_indices: unknown;
  held_items: unknown;
  is_default: unknown;
  location_area_encounters: unknown;
  moves: unknown;
  order: unknown;
  past_abilities: unknown;
  past_types: unknown;
  species: unknown;
  stats: unknown;
  types: unknown;
}
