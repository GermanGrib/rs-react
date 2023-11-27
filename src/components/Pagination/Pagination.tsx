import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { DEFAULT_QUERY_CATALOG } from '../../const';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

function Pagination(): ReactElement {
  const router = useRouter();
  const { query } = router;
  const { page = DEFAULT_QUERY_CATALOG.page } = query;

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    query.page = isPrevious
      ? String(Number(page) - 1)
      : String(Number(page) + 1);
    await router.push({
      pathname: router.pathname,
      query,
    });
  }

  return (
    <div className={styles.container}>
      <PagesCountOptions />
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
