'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Detailed error information:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#12182B] text-white p-4">
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">Please try refreshing the page</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-red-900/50 p-4 rounded mb-4 overflow-auto max-h-48">
                <p className="font-mono text-sm">{this.state.error.toString()}</p>
                {this.state.error.stack && (
                  <pre className="text-xs mt-2 text-gray-300">{this.state.error.stack}</pre>
                )}
              </div>
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.reload();
                }}
                className="px-4 py-2 bg-white text-[#0E1016] rounded hover:bg-gray-200 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="px-4 py-2 border border-white text-white rounded hover:bg-white/10 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 