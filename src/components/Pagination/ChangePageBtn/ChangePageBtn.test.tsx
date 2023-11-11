import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import ChangePageBtn from './ChangePageBtn';

describe('Test ChangePageBtn component', () => {
  test('Should render with "<" symbol if isPrevious is true', () => {
    const onClick = jest.fn();
    const isDisabled = jest.fn(() => false);
    const { container } = render(
      <ChangePageBtn
        currentPage={1}
        onClick={onClick}
        isPrevious={true}
        isDisabled={isDisabled}
      />
    );
    const button = container.querySelector('button');

    expect(button).toBeDefined();
    if (button) {
      expect(button.textContent).toBe('<');
    }
  });

  test('Should render with ">" symbol if isPrevious is false', () => {
    const onClick = jest.fn();
    const isDisabled = jest.fn(() => false);
    const { container } = render(
      <ChangePageBtn
        currentPage={1}
        onClick={onClick}
        isPrevious={false}
        isDisabled={isDisabled}
      />
    );
    const button = container.querySelector('button');

    expect(button).toBeDefined();
    if (button) {
      expect(button.textContent).toBe('>');
    }
  });

  test('Should call onClick when button is clicked', () => {
    const onClick = jest.fn();
    const isDisabled = jest.fn(() => false);
    const { container } = render(
      <ChangePageBtn
        currentPage={1}
        onClick={onClick}
        isPrevious={false}
        isDisabled={isDisabled}
      />
    );
    const button = container.querySelector('button');

    if (button) {
      fireEvent.click(button);
    }
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Should be disabled if isDisabled returns true', () => {
    const onClick = jest.fn();
    const isDisabled = jest.fn(() => true);
    const { container } = render(
      <ChangePageBtn
        currentPage={1}
        onClick={onClick}
        isPrevious={false}
        isDisabled={isDisabled}
      />
    );
    const button = container.querySelector('button');

    if (button) {
      expect(button.disabled).toBeTruthy();
    }
  });
});
