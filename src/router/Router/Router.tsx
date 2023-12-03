import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import ControlForm from "../../pages/ControlForm/ControlForm";
import { Home } from "../../pages/Home";
import UnControlForm from "../../pages/UnControlForm/UnControlForm";
import { paths } from "../const";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />}></Route>
      <Route path={`${paths.controlledform}`} element={<ControlForm />}></Route>
      <Route
        path={`${paths.uncontrolledform}`}
        element={<UnControlForm />}
      ></Route>
    </Routes>
  );
}

export default Router;
