import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import * as Utils from '../../Utils';
import SearchField from './SearchField';

const fakeLoadData = jest.fn(() => Promise.resolve([]));

describe('Test SearchField Component', () => {
  beforeEach(() => {
    localStorage.clear();
    fakeLoadData.mockClear();
  });

  test('Should verify that clicking the Search button saves the entered value to the local storage', async () => {
    const loadDataSpy = jest
      .spyOn(Utils, 'loadData')
      .mockImplementation(fakeLoadData);

    render(
      <MemoryRouter>
        <SearchField />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'test value' } });
    fireEvent.submit(searchInput);
    expect(localStorage.getItem('user-search-value')).toBe('test value');
    expect(loadDataSpy).toHaveBeenCalled();

    loadDataSpy.mockRestore();
  });

  test('Should check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('user-search-value', 'mockTestValue');

    render(
      <MemoryRouter>
        <SearchField />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      'Search...'
    ) as HTMLInputElement;
    expect(searchInput.value).toBe('mockTestValue');
  });
});
