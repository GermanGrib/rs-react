import { Component, ReactElement, ReactNode } from 'react';

interface IErrorBoundary {
  fallback: ReactElement;
  children: ReactNode;
}

interface IErrorState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundary, IErrorState> {
  constructor(props: IErrorBoundary) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorState {
    return { hasError: true };
  }

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
