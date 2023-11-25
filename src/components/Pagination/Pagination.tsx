import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { DEFAULT_QUERY_CATALOG, maxItemsPerPage } from '../../const';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

function Pagination(): ReactElement {
  const router = useRouter();
  const { page } = router.query;
  const { offset: queryOffset } = router.query;
  const { limit } = useAppSelector((state) => state.itemsPerPage);

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    if (page) {
      const updatedPage = isPrevious ? Number(page) - 1 : Number(page) + 1;
      const offset = (updatedPage - 1) * Number(limit);
      router.push({
        query: {
          page: String(updatedPage),
          offset,
          limit,
        },
      });
    }
  }

  function onChangePagesCountOptions(): void {
    const limit = sessionStorage.getItem(maxItemsPerPage);
    router.push({
      query: {
        page: DEFAULT_QUERY_CATALOG.page,
        offset: queryOffset,
        limit,
      },
    });
  }

  return (
    <div className={styles.container}>
      <PagesCountOptions onChange={onChangePagesCountOptions} />
      <ChangePageBtn
        onClick={(): Promise<void> => onChangePageBtnClick(true)}
        isPrevious
        isDisabled={(): boolean => Number(page) === 1}
      />
      <div>{page}</div>
      <ChangePageBtn
        onClick={(): Promise<void> => onChangePageBtnClick(false)}
        isNext
        isDisabled={(): boolean => false}
        data-testid="next-page"
      />
    </div>
  );
}

export default Pagination;
