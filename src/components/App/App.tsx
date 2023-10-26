import { Component, ReactElement } from 'react';
import { Router } from '../../router/Router';
import { ErrorBoundaryBody } from '../ErrorBoundaryBody';
import { ErrorBoundary } from 'react-error-boundary';

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
