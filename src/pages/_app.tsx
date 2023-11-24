import type { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '../components/ErrorBoundary';
import store from '../store';
import '../styles/index.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
}
