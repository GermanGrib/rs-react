import { ReactElement, useContext, useState } from 'react';

import { fetchData } from '../../Utils';
import PokemonDataContext from '../../context/PokemonProvider';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

function Pagination(): ReactElement {
  const [page, setPage] = useState(1);
  const { setPokemonData, isPokemonLoading, setIsPokemonLoading } =
    useContext(PokemonDataContext);

  async function onChangePageBtnClick(isPrevious: boolean): Promise<void> {
    try {
      if (isPrevious) {
        setPage(page - 1);
      } else {
        setPage(page + 1);
      }
      await fetchData({
        page: page,
        setPokemonData: setPokemonData,
        setIsPokemonLoading: setIsPokemonLoading,
      });
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
      <div>Total pages:</div>
    </div>
  );
}

export default Pagination;
