import { Component, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../pages/Home';
import { paths } from '../constants';

class Router extends Component {
  render(): ReactElement {
    return (
      <Routes>
        <Route path={paths.Home} element={<Home />}></Route>
      </Routes>
    );
  }
}

export default Router;
