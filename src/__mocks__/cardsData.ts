import { CardProps } from '../types/interface';

export const MOCK_MAX_CARDS_ITEMS = 20;

export const mockEachCard = {
  name: 'Pikachu',
  id: '1',
};
export const mockCardsData: CardProps[] = Array.from(
  { length: 20 },
  (_, index) => ({
    name: `Title ${index + 1}`,
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
