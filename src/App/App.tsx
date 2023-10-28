import { Component, ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorBoundaryBody } from '../components/ErrorBoundary/ErrorBoundaryBody';
import { Router } from '../router/Router';

class App extends Component {
  render(): ReactElement {
    return (
      <ErrorBoundary fallback={<ErrorBoundaryBody />}>
        <Router />
      </ErrorBoundary>
    );
  }
}

export default App;
