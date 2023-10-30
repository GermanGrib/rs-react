import { Component, ReactElement, ReactNode } from 'react';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';

interface IErrorBoundary {
  fallback: ReactElement;
  children: ReactNode;
}

interface IErrorState {
  hasError: boolean;
  error: null | Error;
}

class ErrorBoundary extends Component<IErrorBoundary, IErrorState> {
  constructor(props: IErrorBoundary) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorState {
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
