import { ReactElement, useContext } from 'react';

import PokemonDataContext from '../../context/PokemonProvider';
import { ChangePageBtn } from './ChangePageBtn';
import { PagesCountOptions } from './PagesCountOptions';
import styles from './pagination.module.scss';

function Pagination(): ReactElement {
  const currentPage = Number(sessionStorage.getItem('currentPage'));
  const { setPokemonData, isPokemonLoading, setIsPokemonLoading } =
    useContext(PokemonDataContext);

  return (
    <div
      className={`${styles.container} ${
        isPokemonLoading ? styles.disable : null
      }`}
    >
      <PagesCountOptions />
      <ChangePageBtn
        currentPage={currentPage}
        setPokemonData={setPokemonData}
        setIsPokemonLoading={setIsPokemonLoading}
        isPrevious
      />
      <div>{currentPage}</div>
      <ChangePageBtn
        currentPage={currentPage}
        setPokemonData={setPokemonData}
        setIsPokemonLoading={setIsPokemonLoading}
        isPrevious={false}
      />
      <div>Total pages:</div>
    </div>
  );
}

export default Pagination;
