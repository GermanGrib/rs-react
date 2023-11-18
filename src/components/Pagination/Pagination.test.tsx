import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { userSearchValue } from '../../const';
import store from '../../store';
import Pagination from './Pagination';

describe('Test Pagination Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should make sure the component updates URL query parameter when page changes', async () => {
    localStorage.setItem(userSearchValue, '');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const paginationElement = screen.getByText(optionsValue);
    expect(paginationElement).toBeDefined();
  });

  test('Should renders empty div if userSearchValue in localStorage is not empty', () => {
    localStorage.setItem(userSearchValue, 'someValue');
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(container.innerHTML).toBe('');
  });
});
