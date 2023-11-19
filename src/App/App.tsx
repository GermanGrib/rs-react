import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Router } from '../router/Router';
import store from '../store';

function App(): ReactElement {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<></>}>
        <Router />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
