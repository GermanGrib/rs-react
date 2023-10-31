import { Dispatch, ReactElement, SetStateAction } from 'react';

import { fetchData } from '../../../Utils';
import { ICard } from '../../../types/interface';

interface PrevBtnProps {
  currentPage: number;
  setPokemonData: Dispatch<SetStateAction<ICard[] | []>>;
  setIsPokemonLoading: Dispatch<SetStateAction<boolean>>;
  isPrevious: boolean;
}

function ChangePageBtn({
  currentPage,
  setPokemonData,
  setIsPokemonLoading,
  isPrevious,
}: PrevBtnProps): ReactElement {
  const pageNumber = isPrevious ? currentPage - 1 : currentPage + 1;
  const prevIsDisabled = isPrevious ? currentPage - 1 === 0 : false;

  async function handleClick(): Promise<void> {
    await fetchData({
      page: pageNumber,
      setPokemonData: setPokemonData,
      setIsPokemonLoading: setIsPokemonLoading,
    });
  }

  return (
    <button disabled={prevIsDisabled} onClick={handleClick}>
      {isPrevious && '<'}
      {!isPrevious && '>'}
    </button>
  );
}

export default ChangePageBtn;
