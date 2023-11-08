import { CardProps } from '../types/interface';

export const MOCK_MAX_CARDS_ITEMS = 20;

export const mockEachCard = {
  cardTitle: 'Pikachu',
  imgSrc: 'pikachu.jpg',
  weight: '6.0 kg',
  height: '0.4 m',
  experience: '112',
  id: '1',
};
export const mockCardsData: CardProps[] = Array.from(
  { length: 20 },
  (_, index) => ({
    cardTitle: `Title ${index + 1}`,
    imgSrc: 'some',
    weight: '35',
    height: '24',
    experience: '33',
    id: `mock${index + 1}`,
  })
);

export const mockDetCardData = {
  name: 'Pikachu',
  weight: '6.0 kg',
  height: '0.4 m',
  base_experience: 112,
  types: [{ type: { name: 'Electric' } }],
  sprites: { front_default: 'pikachu.png' },
};
