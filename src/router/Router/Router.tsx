import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { DetailedCard } from '../../components/Catalog/DetailedCard';
import { Home } from '../../pages/Home';
import { paths } from '../const';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />}>
        <Route path={`${paths.home}`} element={<DetailedCard />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
