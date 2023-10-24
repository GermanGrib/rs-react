import { ICardProps, IPokemonData } from '../types/interface';

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
