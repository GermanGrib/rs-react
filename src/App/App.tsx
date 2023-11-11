import { ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { PokemonProvider } from '../context/PokemonProvider';
import { SearchContextProvider } from '../context/SearchValueProvider';
import { Router } from '../router/Router';

function App(): ReactElement {
  return (
    <SearchContextProvider>
      <PokemonProvider>
        <ErrorBoundary fallback={<></>}>
          <Router />
        </ErrorBoundary>
      </PokemonProvider>
    </SearchContextProvider>
  );
}

export default App;
