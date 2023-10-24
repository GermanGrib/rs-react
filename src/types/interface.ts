export interface ICardProps {
  cardTitle: string;
  imgSrc: string;
  weight: string;
  height: string;
  experience: string;
  id?: string;
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
