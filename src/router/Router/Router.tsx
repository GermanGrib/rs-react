import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../pages/Home';
import { paths } from '../const';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />}></Route>
    </Routes>
  );
}

export default Router;
