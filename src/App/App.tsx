import { Component, ReactElement } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Home } from '../pages/Home';

class App extends Component {
  render(): ReactElement {
    return (
      <ErrorBoundary fallback={<></>}>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
