import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { mockDetCardData } from '../../../__mocks__/cardsData';
import DetailedCard from './DetailedCard';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockStore = configureStore();

describe('Test DetailedCard component', () => {
  test('Should: renders detailed card with data', async () => {
    mockRouter.push('/');
    render(
      <Provider store={mockStore({})}>
        <DetailedCard data={mockDetCardData} />
      </Provider>
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
