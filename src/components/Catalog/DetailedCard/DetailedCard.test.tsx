import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import DetailedCard from './DetailedCard';

const mockApiPokemonData = {
  name: 'Pikachu',
  weight: '60',
  height: '4',
  base_experience: '112',
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: 'pikachu.jpg' },
};

jest.mock('../../../services/rtkQuery/pokemonApi', () => ({
  ...jest.requireActual('../../../services/rtkQuery/pokemonApi'),
  useGetPokemonsQuery: jest.fn(() => ({
    data: mockApiPokemonData,
    isLoading: false,
  })),
}));

describe('Test DetailedCard component', () => {
  test('Should: renders detailed card with data', async () => {
    render(
      <Router>
        <DetailedCard />
      </Router>
    );

    await waitFor(() =>
      expect(screen.getByTestId('detailed-card')).toBeDefined()
    );

    expect(screen.getByText('Name: Pikachu')).toBeDefined();
    expect(screen.getByText('Weight: 60')).toBeDefined();
    expect(screen.getByText('Height: 4')).toBeDefined();
    expect(screen.getByText('HP: 112')).toBeDefined();
    expect(screen.getByText('Skill: electric')).toBeDefined();
    expect(screen.getByAltText('pokemon picture')).toBeDefined();
  });
});
