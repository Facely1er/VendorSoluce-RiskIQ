import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import logger from '../utils/logger';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to logging service
    logger.error('React Error Boundary caught an error:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      stack: error.stack
    });

    this.setState({
      error,
      errorInfo
    });

    // TODO: Send to error tracking service (Sentry, etc.)
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: { react: { componentStack: errorInfo.componentStack } }
    //   });
    // }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <ErrorFallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

// Error Fallback Component - Safe navigation without Router dependency
const ErrorFallback = ({ error, errorInfo, onReset }) => {
  const isDevelopment = import.meta.env.DEV;

  const handleGoHome = () => {
    // Use window.location as fallback when Router context is unavailable
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="error-boundary">
      <div className="error-boundary-container">
        <div className="error-boundary-icon">
          <AlertTriangle size={64} color="#DC2626" />
        </div>
        
        <h1 className="error-boundary-title">Something Went Wrong</h1>
        
        <p className="error-boundary-message">
          We're sorry, but something unexpected happened. The application encountered an error 
          and couldn't continue. Please try refreshing the page or returning to the home page.
        </p>

        {isDevelopment && error && (
          <div className="error-boundary-details">
            <details>
              <summary>Error Details (Development Only)</summary>
              <pre className="error-boundary-stack">
                <strong>Error:</strong> {error?.toString() || 'Unknown error'}
                {errorInfo?.componentStack && (
                  <>
                    {'\n\n'}
                    <strong>Component Stack:</strong>
                    {'\n'}
                    {errorInfo.componentStack}
                  </>
                )}
                {error?.stack && (
                  <>
                    {'\n\n'}
                    <strong>Stack Trace:</strong>
                    {'\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          </div>
        )}

        <div className="error-boundary-actions">
          <button 
            className="error-boundary-button error-boundary-button-primary"
            onClick={onReset}
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <button 
            className="error-boundary-button error-boundary-button-secondary"
            onClick={handleGoHome}
          >
            <Home size={20} />
            Go Home
          </button>
        </div>

        <p className="error-boundary-support">
          If this problem persists, please contact support with the error details above.
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;

