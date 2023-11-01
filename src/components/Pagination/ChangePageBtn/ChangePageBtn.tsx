import { ReactElement } from 'react';

import { maxItemsPerPage, totalResponseItems } from '../../../const';

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
  const totalItems = sessionStorage.getItem(totalResponseItems);
  const maxItems = sessionStorage.getItem(maxItemsPerPage);
  const totalPages =
    totalItems && maxItems
      ? Math.ceil(Number(totalItems) / Number(maxItems))
      : '';

  let isDisabled = false;

  if (isPrevious && currentPage === 1) {
    isDisabled = true;
  } else if (!isPrevious && currentPage >= Number(totalPages)) {
    isDisabled = true;
  }

  return (
    <button disabled={isDisabled} onClick={onClick}>
      {isPrevious ? '<' : '>'}
    </button>
  );
}

export default ChangePageBtn;
