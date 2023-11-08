import { CardProps } from '../types/interface';

export const MOCK_MAX_CARDS_ITEMS = 20;
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
