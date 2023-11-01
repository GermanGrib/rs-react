import { ReactElement, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchData } from '../../Utils';
import { maxItemsPerPage, totalResponseItems } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

interface PaginationProps {
  isLocSearchValueEpmty: boolean;
}

function Pagination({ isLocSearchValueEpmty }: PaginationProps): ReactElement {
  const [page, setPage] = useState(1);
  const { setPokemonData, isPokemonLoading, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const [, setSearchParams] = useSearchParams();
  const limit = sessionStorage.getItem(maxItemsPerPage);
  const totalItems = sessionStorage.getItem(totalResponseItems);
  const totalPages =
    totalItems && limit ? Math.ceil(Number(totalItems) / Number(limit)) : '';

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    const updatedPage = isPrevious ? page - 1 : page + 1;
    const offset = (updatedPage - 1) * Number(limit);
    setPage(updatedPage);
    try {
      await fetchData({
        offset: offset,
        setPokemonData: setPokemonData,
        setIsPokemonLoading: setIsPokemonLoading,
      });
      const options = `?limit=${limit}&offset=${offset}`;
      setSearchParams(options);
    } catch {
      throw new Error('During click on change page btn');
    } finally {
      setIsPokemonLoading(false);
    }
  }

  function onChangePagesCountOptions(): void {
    setPage(1);
  }

  return (
    <>
      {isLocSearchValueEpmty && (
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
          />
          <div>{page}</div>
          <ChangePageBtn
            currentPage={page}
            onClick={(): Promise<void> => onChangePageBtnClick(false)}
            isPrevious={false}
          />
          <div>Total pages: {totalPages}</div>
        </div>
      )}
    </>
  );
}

export default Pagination;
