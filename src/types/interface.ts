export interface ICard {
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

export interface DetailedCardData extends IPokemonData {
  types: { type: { name: string } }[];
}

export interface IPokemonFullResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: { name: string; url: string }[];
}

export interface FetchData {
  offset: number;
  setIsPokemonLoading: (value: boolean) => void;
  setPokemonData: (value: ICard[]) => void;
  options?: QueryOptions;
}

export interface QueryOptions {
  itemsLimit: string | null;
  offset: string | null;
}
