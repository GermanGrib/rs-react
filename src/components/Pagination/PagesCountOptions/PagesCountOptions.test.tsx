import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PagesCountOptions from './PagesCountOptions';

describe('Test PagesCountOptions component', () => {
  test('Should render select element with default value', () => {
    const onChange = jest.fn();
    render(
      <MemoryRouter>
        <PagesCountOptions onChange={onChange} />
      </MemoryRouter>
    );
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    expect(selectElement).toBeDefined();
    expect(selectElement.value).toBe('20');
  });

  test('Should change value on select change', async () => {
    const onChange = jest.fn();
    render(
      <MemoryRouter>
        <PagesCountOptions onChange={onChange} />
      </MemoryRouter>
    );
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    expect(selectElement).toBeDefined();

    await act(async () => {
      fireEvent.change(selectElement, { target: { value: '40' } });
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(selectElement.value).toBe('40');
  });
});
