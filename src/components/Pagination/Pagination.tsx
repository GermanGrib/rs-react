import React, { ReactElement, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchData } from '../../Utils';
import PokemonDataContext from '../../context/PokemonProvider';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';
import { getStorageData, isChangePageBtnDisabled } from './utils';

function Pagination(): ReactElement {
  const [searchParams] = useSearchParams();
  const initialPage =
    searchParams.get('page') === null ? 1 : Number(searchParams.get('page'));
  const [page, setPage] = useState(initialPage);
  const { setPokemonData, isPokemonLoading, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const [, setSearchParams] = useSearchParams();
  const { limit, totalItems, localSearchValue } = getStorageData();
  const totalPages =
    totalItems && limit ? Math.ceil(Number(totalItems) / Number(limit)) : '';
  const isLocSearchValueEmpty = localSearchValue === '';

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    const updatedPage = isPrevious ? page - 1 : page + 1;
    const offset = (updatedPage - 1) * Number(limit);
    setPage(updatedPage);
    await fetchData({
      offset: offset,
      setPokemonData: setPokemonData,
      setIsPokemonLoading: setIsPokemonLoading,
    });
    const options = `?limit=${limit}&offset=${offset}&page=${updatedPage}`;
    setSearchParams(options);
  }

  function onChangePagesCountOptions(): void {
    setPage(1);
  }

  return (
    <>
      {isLocSearchValueEmpty && (
        <div
          className={`${styles.container} ${
            isPokemonLoading ? styles.disable : ''
          }`}
        >
          <PagesCountOptions onChange={onChangePagesCountOptions} />
          <ChangePageBtn
            currentPage={page}
            onClick={(): Promise<void> => onChangePageBtnClick(true)}
            isPrevious
            isDisabled={(): boolean =>
              isChangePageBtnDisabled({ isPrevious: true, currentPage: page })
            }
          />
          <div>{page}</div>
          <ChangePageBtn
            currentPage={page}
            onClick={(): Promise<void> => onChangePageBtnClick(false)}
            isPrevious={false}
            isDisabled={(): boolean =>
              isChangePageBtnDisabled({ isPrevious: false, currentPage: page })
            }
          />
          <div>Total pages: {totalPages}</div>
        </div>
      )}
    </>
  );
}

export default Pagination;
