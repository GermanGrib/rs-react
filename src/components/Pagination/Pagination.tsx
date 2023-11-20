import React, { ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';
import { isChangePageBtnDisabled } from './utils';

function Pagination(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage =
    searchParams.get('page') === null ? 1 : Number(searchParams.get('page'));
  const [page, setPage] = useState(initialPage);
  const searchValue = useAppSelector((state) => state.searchValue.searchValue);
  const isEmptySearchValue = searchValue === '';
  const { limit } = useAppSelector((state) => state.itemsPerPage);
  const isPokemonLoading = useAppSelector(
    (state) => state.loadingMainPage.loadingMainPage
  );

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    const updatedPage = isPrevious ? page - 1 : page + 1;
    const offset = (updatedPage - 1) * Number(limit);
    setPage(updatedPage);
    setSearchParams({
      limit: limit,
      offset: String(offset),
      page: String(updatedPage),
    });
  }

  function onChangePagesCountOptions(): void {
    setPage(1);
  }

  return (
    <>
      {isEmptySearchValue && (
        <div
          className={`${styles.container} ${
            isPokemonLoading ? styles.disable : ''
          }`}
        >
          <PagesCountOptions onChange={onChangePagesCountOptions} />
          <ChangePageBtn
            onClick={(): Promise<void> => onChangePageBtnClick(true)}
            isPrevious
            isDisabled={(): boolean =>
              isChangePageBtnDisabled({
                isPrevious: true,
                currentPage: page,
              })
            }
          />
          <div>{page}</div>
          <ChangePageBtn
            onClick={(): Promise<void> => onChangePageBtnClick(false)}
            isNext
            isDisabled={(): boolean => false}
            data-testid="next-page"
          />
        </div>
      )}
    </>
  );
}

export default Pagination;
