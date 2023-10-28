import { Component, ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorBoundaryBody } from '../components/ErrorBoundary/ErrorBoundaryBody';
import { Home } from '../pages/Home';

class App extends Component {
  render(): ReactElement {
    return (
      <ErrorBoundary fallback={<ErrorBoundaryBody />}>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
