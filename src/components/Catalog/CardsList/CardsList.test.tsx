import { render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';

import {
  MOCK_MAX_CARDS_ITEMS,
  mockCardListData,
} from '../../../__mocks__/cardsData';
import { CardsList } from './index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
describe('Test CardsList component', () => {
  beforeEach(() => {
    mockRouter.push('/');
  });

  test('Should verify that the component renders the specified number of cards', () => {
    const { container } = render(
      <CardsList cardsData={mockCardListData.cardsData} />
    );

    const ulElement = container.querySelector('ul');
    if (ulElement) {
      const liElements = ulElement.querySelectorAll('li');
      expect(liElements.length).toBe(MOCK_MAX_CARDS_ITEMS);
    }
  });
});
