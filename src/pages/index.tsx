import React, { ReactElement } from 'react';

import { Catalog } from '../components/Catalog';
import { Header } from '../components/Header';

export default function Index(): ReactElement {
  return (
    <>
      <Header />
      <Catalog />
    </>
  );
}
