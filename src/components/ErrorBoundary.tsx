
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { handleError } from '@/lib/errorUtils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    handleError(error, 'ErrorBoundary');
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 max-w-md mx-auto my-8 bg-background border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-red-600 mb-4">
            Something went wrong
          </h2>
          <div className="bg-red-50 p-4 rounded-md mb-4 overflow-auto max-h-40">
            <p className="text-sm text-red-800 font-mono">
              {this.state.error?.toString()}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Try refreshing the page or going back to the home page.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="px-4 py-2 bg-secondary text-foreground rounded-md text-sm hover:bg-secondary/90 transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
