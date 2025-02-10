import { Component, ErrorInfo, ReactNode, createContext } from 'react';
import * as Sentry from '@sentry/react';
import ErrorPage from "#components/ErrorPage";

interface ErrorContextType {
  error: Error | null;
}

export const ErrorContext = createContext<ErrorContextType>({ error: null });

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundaryProvider - Captures and logs errors globally using React Error Boundary.
 * Integrates with Sentry for monitoring and provides context for error handling.
 */
class ErrorBoundaryProvider extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
          <ErrorContext.Provider value={{ error: this.state.error || null }}>
            {this.props.fallback || (
              <ErrorPage />
            )}
          </ErrorContext.Provider>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundaryProvider;
