import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { userSearchValue } from '../../const';
import Pagination from './Pagination';

describe('Test Pagination Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should make sure the component updates URL query parameter when page changes', async () => {
    localStorage.setItem(userSearchValue, '');
    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>
    );

    const nextPageButton = screen.getAllByRole('button')[1];
    fireEvent.click(nextPageButton);

    setTimeout(() => {
      const updatedURL = new URL(window.location.href);
      const updatedPageValue = updatedURL.searchParams.get('page');
      expect(updatedPageValue).toBe(2);
    }, 1000);
  });

  test('Renders the Pagination component', async () => {
    localStorage.setItem(userSearchValue, '');
    const optionsValue = '40';
    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>
    );

    const paginationElement = screen.getByText(optionsValue);
    expect(paginationElement).toBeDefined();
  });

  test('Should renders empty div if userSearchValue in localStorage is not empty', () => {
    localStorage.setItem(userSearchValue, 'someValue');
    const { container } = render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>
    );

    expect(container.innerHTML).toBe('');
  });
});
