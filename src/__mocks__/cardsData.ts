import { PokemonGeneralResponse } from '../services/types/interface';
import { CardProps, DetailedCardFields } from '../types/interface';

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

export const mockDetCardData: DetailedCardFields = {
  name: 'Pikachu',
  weight: '60',
  height: '4',
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: 'pikachu.png' },
  base_experience: '112',
  id: '',
};

export const mockCardListData: { cardsData: PokemonGeneralResponse } = {
  cardsData: {
    results: mockCardsData,
    count: 0,
  },
};
