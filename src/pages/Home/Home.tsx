import { ReactElement } from 'react';

import { Catalog } from '../../components/Catalog';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';

function Home(): ReactElement {
  return (
    <>
      <Header />
      <Pagination />
      <Catalog />
    </>
  );
}

export default Home;
