import React, { ReactElement } from 'react';

interface PrevBtnProps {
  currentPage: number;
  onClick: () => void;
  isPrevious: boolean;
  isDisabled: () => boolean;
}

function ChangePageBtn({
  onClick,
  isPrevious,
  isDisabled,
}: PrevBtnProps): ReactElement {
  const disabled = isDisabled();

  return (
    <button disabled={disabled} onClick={onClick}>
      {isPrevious ? '<' : '>'}
    </button>
  );
}

export default ChangePageBtn;
