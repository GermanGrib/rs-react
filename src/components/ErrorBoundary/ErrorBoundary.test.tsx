import { render, screen } from '@testing-library/react';
import React from 'react';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';

describe('404 Page Component', () => {
  test('Should ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const error = new Error('mock Error');
    render(<ErrorBoundaryBody error={error} />);

    const notFoundText = screen.getByText('Oh no! You broke everything!');
    expect(notFoundText).toBeDefined();
  });
});
