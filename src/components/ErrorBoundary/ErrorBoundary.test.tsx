import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';

describe('404 Page Component', () => {
  test('Should ensure that the 404 page is displayed when navigating to an invalid route', () => {
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
