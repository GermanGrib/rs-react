import { ReactElement } from 'react';

function PagesCountOptions(): ReactElement {
  return (
    <select id="Items">
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
  );
}

export default PagesCountOptions;
