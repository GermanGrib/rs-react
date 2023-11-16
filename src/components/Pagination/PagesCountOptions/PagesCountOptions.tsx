import React, { ChangeEvent, ReactElement, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchData } from '../../../Utils';
import { maxItemsPerPage } from '../../../const';
import PokemonDataContext from '../../../context/PokemonProvider';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setMaxItemsPerPage } from '../../../store/slices/itemsPerPageSlice';

interface PagesCountProps {
  onChange: () => void;
}

function PagesCountOptions({ onChange }: PagesCountProps): ReactElement {
  const selectedValue = useAppSelector(
    (state) => state.itemsPerPage.maxItemsPerPage
  );
  const dispatch = useAppDispatch();
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxItemsOnPage = searchParams.get('limit');

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const currentValue = e.target.value;
    sessionStorage.setItem(maxItemsPerPage, currentValue);
    await fetchData({
      setPokemonData,
      setIsPokemonLoading,
      offset: 0,
    });
    dispatch(setMaxItemsPerPage(currentValue));
    setSearchParams({ limit: currentValue, offset: '0', page: '1' });
    onChange();
  }

  return (
    <select
      id="Items"
      onChange={(e): Promise<void> => handleSelectChange(e)}
      value={maxItemsOnPage ? maxItemsOnPage : selectedValue}
    >
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
  );
}

export default PagesCountOptions;
