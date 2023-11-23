import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement } from 'react';

import { DEFAULT_QUERY_CATALOG } from '../../../const';

function PagesCountOptions(): ReactElement {
  const router = useRouter();
  const { query } = router;

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    query.limit = e.target.value;
    query.page = DEFAULT_QUERY_CATALOG.page;
    router.push({ query });
  }

  return (
    <select id="Items" onChange={handleSelectChange} value={query.limit}>
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
  );
}

export default PagesCountOptions;
