import { render, screen } from '@testing-library/react';
import React from 'react';

import NoInfo from './NoInfo';

describe('Test NoInfo component', () => {
  test('Should renders NoInfo component', () => {
    render(<NoInfo />);

    expect(screen.getByText(/there is no data for this query/i)).toBeDefined();
  });
});
