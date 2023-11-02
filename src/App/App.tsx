import { ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { PokemonProvider } from '../context/PokemonProvider';
import { Router } from '../router/Router';

function App(): ReactElement {
  return (
    <PokemonProvider>
      <ErrorBoundary fallback={<></>}>
        <Router />
      </ErrorBoundary>
    </PokemonProvider>
  );
}

export default App;
