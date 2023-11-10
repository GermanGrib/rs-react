import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mockDetCardData } from '../../../__mocks__/cardsData';
import DetailedCard from './DetailedCard';

describe('Test DetailedCard component', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  test('Should check that a loading indicator is displayed while fetching data', async () => {
    fetchMock.mockOnce(JSON.stringify({}));

    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('detailed', '1');
    global.URLSearchParams = jest.fn(() => mockSearchParams);

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('Should make sure the detailed card component correctly displays the detailed card data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDetCardData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await screen.findByText('Name: Pikachu');
    expect(screen.getByText(`Name: ${mockDetCardData.name}`)).toBeDefined();
    expect(screen.getByText(`Weight: ${mockDetCardData.weight}`)).toBeDefined();
    expect(screen.getByText(`Height: ${mockDetCardData.height}`)).toBeDefined();
    expect(
      screen.getByText(`HP: ${mockDetCardData.base_experience}`)
    ).toBeDefined();
    expect(
      screen.getByText(`Skill: ${mockDetCardData.types[0].type.name}`)
    ).toBeDefined();
  });

  test('Should ensure that clicking the close button hides the component', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDetCardData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loadingMessage = screen.queryByText('Loading...');
      expect(loadingMessage).toBeNull();
    });

    expect(screen.getByTestId('detailed-card')).toBeDefined();
    const closeButton = screen.getByText('Close detailed');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const detailedCard = screen.queryByTestId('detailed-card');
      expect(detailedCard).toBeNull();
    });
  });

  test('Should check that clicking triggers an additional API call to fetch detailed information', async () => {
    fetchMock.mockOnce(JSON.stringify({}));

    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('detailed', '1');
    global.URLSearchParams = jest.fn(() => mockSearchParams);

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });
});
