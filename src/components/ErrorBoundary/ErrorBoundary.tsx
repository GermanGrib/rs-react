import React, { Component, ReactElement, ReactNode } from 'react';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: null | Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error };
  }

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return <ErrorBoundaryBody error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
