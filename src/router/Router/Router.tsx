import { Component, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '../constants';
import { Home } from '../../pages/Home';

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
