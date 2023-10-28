import { Component, ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorBoundaryBody } from '../components/ErrorBoundaryBody';
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
