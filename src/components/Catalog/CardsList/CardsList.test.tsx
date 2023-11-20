import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  MOCK_MAX_CARDS_ITEMS,
  mockCardsData,
} from '../../../__mocks__/cardsData';
import { CardsList } from './index';

describe('Test CardsList component', () => {
  test('Should verify that the component renders the specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <CardsList
          cardsData={mockCardsData}
          setIsDetailedOpen={(): void => {}}
          isDetailedOpen={false}
          isCardsDataError={false}
        />
      </MemoryRouter>
    );

    const ulElement = container.querySelector('ul');
    if (ulElement) {
      const liElements = ulElement.querySelectorAll('li');
      expect(liElements.length).toBe(MOCK_MAX_CARDS_ITEMS);
    }
  });

  test('Should check that an appropriate message is displayed if no cards are present', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CardsList
          cardsData={[]}
          setIsDetailedOpen={(): void => {}}
          isDetailedOpen={false}
          isCardsDataError={true}
        />
      </MemoryRouter>
    );

    const noCardsMessage = getByText('There is no data for this query');
    expect(noCardsMessage).toBeTruthy();
  });

  test('Should validate that clicking on a card opens a detailed card component', () => {
    const setIsDetailedOpen = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <CardsList
          cardsData={mockCardsData}
          setIsDetailedOpen={setIsDetailedOpen}
          isDetailedOpen={false}
          isCardsDataError={false}
        />
      </MemoryRouter>
    );

    const liElement = getByText('Title 20');
    fireEvent.click(liElement);

    expect(setIsDetailedOpen).toHaveBeenCalledWith(true);
  });
});
