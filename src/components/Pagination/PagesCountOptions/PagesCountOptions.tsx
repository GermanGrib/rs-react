import React, { ChangeEvent, ReactElement } from 'react';

import { maxItemsPerPage } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setMaxItemsPerPage } from '../../../store/slices/itemsPerPageSlice';

interface PagesCountProps {
  onChange: () => void;
}

function PagesCountOptions({ onChange }: PagesCountProps): ReactElement {
  const selectedValue = useAppSelector((state) => state.itemsPerPage.limit);
  const dispatch = useAppDispatch();

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const currentValue = e.target.value;
    sessionStorage.setItem(maxItemsPerPage, currentValue);
    dispatch(setMaxItemsPerPage(currentValue));
    onChange();
  }

  return (
    <select
      id="Items"
      onChange={(e): Promise<void> => handleSelectChange(e)}
      value={selectedValue}
    >
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
  );
}

export default PagesCountOptions;
