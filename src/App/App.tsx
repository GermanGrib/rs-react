import { ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Home } from '../pages/Home';

function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<></>}>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
