import { ReactElement } from 'react';

interface PrevBtnProps {
  currentPage: number;
  onClick: () => void;
  isPrevious: boolean;
}

function ChangePageBtn({
  currentPage,
  onClick,
  isPrevious,
}: PrevBtnProps): ReactElement {
  const prevIsDisabled = isPrevious ? currentPage - 1 === 0 : false;

  return (
    <button disabled={prevIsDisabled} onClick={onClick}>
      {isPrevious && '<'}
      {!isPrevious && '>'}
    </button>
  );
}

export default ChangePageBtn;
