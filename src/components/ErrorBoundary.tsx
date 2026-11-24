import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { getFriendlyErrorDetails } from '@/utils/errorHelpers';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.error('Application boundary caught error:', error, info.componentStack);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    this.setState({ hasError: false, error: null });
    if (window.location.pathname !== '/') {
      window.location.assign('/');
    }
  };

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { title, description } = getFriendlyErrorDetails(this.state.error);

    return (
      <div className="min-h-screen bg-zogago-dark text-zogago-light flex items-center justify-center px-4 py-16">
        <div
          role="alert"
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl"
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-zogago-blue/30 bg-zogago-blue/10 text-zogago-blue">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-3">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-zogago-light/70 mb-7">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-zogago-blue to-zogago-purple px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zogago-light transition-colors hover:bg-white/[0.08]"
            >
              <Home className="h-4 w-4" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
