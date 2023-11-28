import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from '../router/Router';
import store from '../store';

function App(): ReactElement {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
