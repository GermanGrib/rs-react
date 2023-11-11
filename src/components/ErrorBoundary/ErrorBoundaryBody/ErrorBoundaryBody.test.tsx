import { render, screen } from '@testing-library/react';
import React from 'react';

import ErrorBoundaryBody from './ErrorBoundaryBody';

describe('Test ErrorBoundaryBody component', () => {
  test('Should displays error message if error is provided', () => {
    const errorMessage = 'This is an error message.';
    const error = new Error(errorMessage);

    render(<ErrorBoundaryBody error={error} />);

    const errorTitle = screen.getByText('Error message');
    const displayedErrorMessage = screen.getByText(errorMessage);

    expect(errorTitle).toBeDefined();
    expect(displayedErrorMessage).toBeDefined();
  });

  test('contains a link to reload the page and return home', () => {
    render(<ErrorBoundaryBody error={new Error()} />);

    const link = screen.getByText(
      'Thankfully, we have a Frontend developer - just click on me, silly.'
    );

    expect(link).toBeDefined();
  });
});
