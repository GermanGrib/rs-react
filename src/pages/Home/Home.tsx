import { ReactElement } from 'react';

import { Catalog } from '../../components/Catalog';
import { Header } from '../../components/Header';

function Home(): ReactElement {
  return (
    <>
      <Header />
      <Catalog />
    </>
  );
}

export default Home;
