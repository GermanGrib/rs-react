import { ChangeEvent, ReactElement, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { loadData } from '../../../Utils';
import { maxItemsPerPage } from '../../../const';
import PokemonDataContext from '../../../context/PokemonProvider';

interface PagesCountProps {
  onChange: () => void;
}

function PagesCountOptions({ onChange }: PagesCountProps): ReactElement {
  const [selectedValue, setSelectedValue] = useState('20');
  const { setPokemonData, setIsPokemonLoading } =
    useContext(PokemonDataContext);
  const [searchParams] = useSearchParams();
  const maxItemsOnPage = searchParams.get('limit');

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const currentValue = e.target.value;
    setSelectedValue(currentValue);
    try {
      sessionStorage.setItem(maxItemsPerPage, currentValue);
      setIsPokemonLoading(true);
      onChange();
      const data = await loadData({ offset: 0 });
      setPokemonData(data);
    } catch {
      throw new Error('During handleSelectChange');
    } finally {
      setIsPokemonLoading(false);
    }
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
