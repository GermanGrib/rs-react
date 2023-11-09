import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';

describe('404 Page Component', () => {
  test('Should display the 404 page for invalid routes', () => {
    const error = new Error('mock Error');
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <ErrorBoundaryBody error={error} />
      </MemoryRouter>
    );

    const notFoundText = screen.getByText('Oh no! You broke everything!');
    expect(notFoundText).toBeDefined();
  });
});
