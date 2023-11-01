import { ReactElement, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchData } from '../../Utils';
import { maxItemsPerPage, totalResponseItems } from '../../const';
import PokemonDataContext from '../../context/PokemonProvider';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

function Pagination(): ReactElement {
  const [page, setPage] = useState(1);
  const { setPokemonData, isPokemonLoading, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const [, setSearchParams] = useSearchParams();
  const limit = sessionStorage.getItem(maxItemsPerPage);
  const totalItems = sessionStorage.getItem(totalResponseItems);
  const totalPages =
    totalItems && limit ? Math.ceil(Number(totalItems) / Number(limit)) : '';

  // const showPage = searchOffset ? Number(searchOffset) + 1 : page;

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    const updatedPage = isPrevious ? page - 1 : page + 1;
    setPage(updatedPage);
    try {
      await fetchData({
        offset: updatedPage - 1,
        setPokemonData: setPokemonData,
        setIsPokemonLoading: setIsPokemonLoading,
      });
      const options = `?limit=${limit}&offset=${updatedPage - 1}`;
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
    <div
      className={`${styles.container} ${
        isPokemonLoading ? styles.disable : null
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
  );
}

export default Pagination;
