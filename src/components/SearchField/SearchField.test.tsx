import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

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

    render(<SearchField />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test value' } });

    act(() => {
      fireEvent.submit(screen.getByRole('search'));
    });

    expect(localStorage.getItem('searchValue')).toBe('test value');
    expect(loadDataSpy).toHaveBeenCalled();
    loadDataSpy.mockRestore();
  });
});
