import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary to catch and handle React component errors
 * Displays user-friendly error message with retry option
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Could send to error tracking service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <h2 className="error-title">Oops! Something went wrong</h2>
            <p className="error-message">
              {this.props.fallbackMessage || 
                "We encountered an unexpected error. Don't worry, your progress is saved!"}
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Technical Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}

            <div className="error-actions">
              <button 
                className="btn btn-primary"
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </button>
            </div>
          </div>

          <style>{`
            .error-boundary {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 2rem;
            }

            .error-container {
              max-width: 500px;
              text-align: center;
              background: var(--card-bg, #fff);
              padding: 2rem;
              border-radius: 12px;
              box-shadow: var(--shadow-lg, 0 4px 6px rgba(0,0,0,0.1));
            }

            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }

            .error-title {
              color: var(--text-primary, #1a1a1a);
              margin-bottom: 1rem;
              font-size: 1.5rem;
            }

            .error-message {
              color: var(--text-secondary, #666);
              margin-bottom: 1.5rem;
              line-height: 1.6;
            }

            .error-details {
              text-align: left;
              margin: 1rem 0;
              padding: 1rem;
              background: var(--bg-secondary, #f5f5f5);
              border-radius: 8px;
              font-size: 0.875rem;
            }

            .error-details summary {
              cursor: pointer;
              font-weight: 600;
              color: var(--text-primary, #1a1a1a);
              margin-bottom: 0.5rem;
            }

            .error-details pre {
              white-space: pre-wrap;
              word-break: break-word;
              color: var(--text-secondary, #666);
              font-family: monospace;
              font-size: 0.75rem;
            }

            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }

            .btn {
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn-primary {
              background: var(--primary-color, #4a90e2);
              color: white;
            }

            .btn-primary:hover {
              background: var(--primary-dark, #357abd);
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
            }

            .btn-secondary {
              background: var(--bg-secondary, #f5f5f5);
              color: var(--text-primary, #1a1a1a);
            }

            .btn-secondary:hover {
              background: var(--bg-tertiary, #e0e0e0);
            }

            @media (max-width: 768px) {
              .error-boundary {
                min-height: 300px;
                padding: 1rem;
              }

              .error-container {
                padding: 1.5rem;
              }

              .error-icon {
                font-size: 3rem;
              }

              .error-title {
                font-size: 1.25rem;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string,
  onError: PropTypes.func,
  onReset: PropTypes.func,
};

export default ErrorBoundary;
