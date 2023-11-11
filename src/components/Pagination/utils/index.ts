import { maxItemsPerPage, totalResponseItems } from '../../../const';

interface IsChangeBtnDisabledProps {
  isPrevious: boolean;
  currentPage: number;
}

export function isChangePageBtnDisabled({
  isPrevious,
  currentPage,
}: IsChangeBtnDisabledProps): boolean {
  const totalItems = sessionStorage.getItem(totalResponseItems);
  const maxItems = sessionStorage.getItem(maxItemsPerPage);
  const totalPages =
    totalItems && maxItems
      ? Math.ceil(Number(totalItems) / Number(maxItems))
      : 0;

  return (
    (isPrevious && currentPage === 1) ||
    (!isPrevious && currentPage >= totalPages)
  );
}

interface GetStorageData {
  limit: string;
  totalItems: string;
}

export function getStorageData(): GetStorageData {
  const limit = sessionStorage.getItem(maxItemsPerPage);
  const totalItems = sessionStorage.getItem(totalResponseItems);

  return {
    limit: limit || '',
    totalItems: totalItems || '',
  };
}
