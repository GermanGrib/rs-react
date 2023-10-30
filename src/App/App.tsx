import { ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { CurrentPageProvider } from '../context/PagesProvider';
import { PokemonProvider } from '../context/PokemonProvider';
import { Home } from '../pages/Home';

function App(): ReactElement {
  return (
    <CurrentPageProvider>
      <PokemonProvider>
        <ErrorBoundary fallback={<></>}>
          <Home />
        </ErrorBoundary>
      </PokemonProvider>
    </CurrentPageProvider>
  );
}

export default App;
