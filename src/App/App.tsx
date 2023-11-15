import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { PokemonProvider } from '../context/PokemonProvider';
import { SearchContextProvider } from '../context/SearchValueProvider';
import { Router } from '../router/Router';
import store from '../store';

function App(): ReactElement {
  return (
    <SearchContextProvider>
      <PokemonProvider>
        <Provider store={store}>
          <ErrorBoundary fallback={<></>}>
            <Router />
          </ErrorBoundary>
        </Provider>
      </PokemonProvider>
    </SearchContextProvider>
  );
}

export default App;
