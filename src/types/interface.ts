export interface CardProps {
  name: string;
  url?: string;
  id?: string | number;
}

export interface DetailedCardProps {
  name: string;
  weight: string;
  height: string;
  base_experience: string;
  id: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export interface QueryPokemonOptions {
  query?: {
    limit: string | null;
    offset: string | null;
  };
  name?: string;
}
