import { Component, ReactElement } from 'react';

import { Catalog } from '../../components/Catalog';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryBody } from '../../components/ErrorBoundaryBody';

class Home extends Component {
  render(): ReactElement {
    return (
      <ErrorBoundary fallback={<ErrorBoundaryBody />}>
        <Catalog />
      </ErrorBoundary>
    );
  }
}

export default Home;
