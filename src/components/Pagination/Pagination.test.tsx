import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Pagination from './Pagination';

describe('Test Pagination Component', () => {
  test('Should make sure the component updates URL query parameter when page changes', async () => {
    const page = 2;

    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());

    const originalSearchParams = global.URLSearchParams;
    global.URLSearchParams = jest.fn(() => searchParams);

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>
    );

    await waitFor(() => {
      setTimeout(() => {
        const nextButton = screen.getByTestId('next-page');
        fireEvent.click(nextButton);
        expect(searchParams.get('page')).toBe((page + 1).toString());
        global.URLSearchParams = originalSearchParams;
      }, 1000);
    });
  });
});
