import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  MOCK_MAX_CARDS_ITEMS,
  mockCardsData,
} from '../../../__mocks__/cardsData';
import { CardsList } from './';

describe('Test CardsList component', () => {
  test('Render items same as MAX_CARDS_ITEMS', () => {
    const { container } = render(
      <MemoryRouter>
        <CardsList
          cardsData={mockCardsData}
          setIsDetailedOpen={(): void => {}}
          isDetailedOpen={false}
        />
      </MemoryRouter>
    );

    const ulElement = container.querySelector('ul');
    if (ulElement) {
      const liElements = ulElement.querySelectorAll('li');
      expect(liElements.length).toBe(MOCK_MAX_CARDS_ITEMS);
    }
  });
});
