import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mockEachCard } from '../../../__mocks__/cardsData';
import Card from './Card';

describe('Test Card component', () => {
  test('Should ensure that the card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Card {...mockEachCard} />
      </BrowserRouter>
    );

    const cardTitle = screen.getByText(mockEachCard.cardTitle);
    const weight = screen.getByText(mockEachCard.weight);
    const height = screen.getByText(mockEachCard.height);
    const experience = screen.getByText(mockEachCard.experience);

    expect(cardTitle).toBeDefined();
    expect(weight).toBeDefined();
    expect(height).toBeDefined();
    expect(experience).toBeDefined();
  });
});
