import React, { HTMLAttributes, ReactElement } from 'react';

interface ChangePageBtnProps extends HTMLAttributes<HTMLButtonElement> {
  isPrevious?: boolean;
  isNext?: boolean;
  isDisabled: () => boolean;
}

function ChangePageBtn({
  isPrevious,
  isNext,
  children,
  isDisabled,
  ...props
}: ChangePageBtnProps): ReactElement {
  const disabled = isDisabled();

  return (
    <button disabled={disabled} {...props}>
      {isPrevious && '<'}
      {isNext && '>'}
      {children}
    </button>
  );
}

export default ChangePageBtn;
