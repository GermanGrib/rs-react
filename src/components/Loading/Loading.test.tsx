import { render, screen } from '@testing-library/react';
import React from 'react';

import Loading from './Loading';

describe('Test Loading component', () => {
  it('Should renders Loading component', () => {
    render(<Loading />);

    expect(screen.getByText(/loading.../i)).toBeDefined();
  });
});
