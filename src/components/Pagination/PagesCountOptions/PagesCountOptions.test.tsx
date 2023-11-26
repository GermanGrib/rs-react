import { act, fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../../store';
import PagesCountOptions from './PagesCountOptions';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
describe('Test PagesCountOptions component', () => {
  beforeEach(() => {
    mockRouter.push('/');
    render(
      <Provider store={store}>
        <PagesCountOptions />
      </Provider>
    );
  });

  test('Should render select element with default value', () => {
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeDefined();
    expect(selectElement.value).toBe('20');
  });

  test('Should change value on select change', async () => {
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeDefined();

    await act(async () => {
      fireEvent.change(selectElement, { target: { value: '40' } });
    });

    expect(selectElement.value).toBe('40');
  });
});
