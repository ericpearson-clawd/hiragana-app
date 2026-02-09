import PropTypes from 'prop-types';

/**
 * User-friendly error message component with retry option
 */
function ErrorMessage({ 
  message = 'Something went wrong',
  onRetry,
  dismissible = false,
  onDismiss,
  type = 'error' // 'error', 'warning', 'info'
}) {
  const getIcon = () => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '❌';
    }
  };

  return (
    <div 
      className={`error-message error-message-${type}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-content">
        <span className="error-icon" aria-hidden="true">{getIcon()}</span>
        <p className="error-text">{message}</p>
      </div>
      
      <div className="error-actions">
        {onRetry && (
          <button 
            className="error-btn error-btn-retry"
            onClick={onRetry}
            aria-label="Retry"
          >
            🔄 Retry
          </button>
        )}
        {dismissible && onDismiss && (
          <button 
            className="error-btn error-btn-dismiss"
            onClick={onDismiss}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        )}
      </div>

      <style>{`
        .error-message {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-message-error {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
        }

        .error-message-warning {
          background: #fffbea;
          border: 1px solid #ffd966;
          color: #8b6914;
        }

        .error-message-info {
          background: #e7f3ff;
          border: 1px solid #b3d9ff;
          color: #004085;
        }

        [data-theme="dark"] .error-message-error {
          background: #5a1a1a;
          border-color: #8a2a2a;
          color: #ffcccc;
        }

        [data-theme="dark"] .error-message-warning {
          background: #4a3a0a;
          border-color: #6a5a1a;
          color: #ffeaa7;
        }

        [data-theme="dark"] .error-message-info {
          background: #0a2a4a;
          border-color: #1a4a7a;
          color: #b3d9ff;
        }

        .error-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .error-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .error-text {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .error-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .error-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .error-btn-retry {
          background: var(--primary-color, #4a90e2);
          color: white;
        }

        .error-btn-retry:hover {
          background: var(--primary-dark, #357abd);
          transform: translateY(-1px);
        }

        .error-btn-dismiss {
          background: transparent;
          color: inherit;
          padding: 0.5rem;
          font-size: 1.25rem;
        }

        .error-btn-dismiss:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] .error-btn-dismiss:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 640px) {
          .error-message {
            flex-direction: column;
            align-items: flex-start;
          }

          .error-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
};

export default ErrorMessage;
