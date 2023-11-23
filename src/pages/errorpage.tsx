import React, { ReactElement } from 'react';

import { ErrorBoundaryBody } from '../components/ErrorBoundary/ErrorBoundaryBody';

function Errorpage(): ReactElement {
  console.error('RS School Error task');
  return <ErrorBoundaryBody error={new Error('RS School Error task')} />;
}

export default Errorpage;
