import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockEachCard } from '../../../__mocks__/cardsData';
import Card from './Card';

describe('Test Card component', () => {
  test('Should ensure that the card component renders the relevant card data', () => {
    render(<Card {...mockEachCard} />);

    const cardTitle = screen.getByText(mockEachCard.name);

    expect(cardTitle).toBeDefined();
  });
});
