import { useState } from 'react';

export default function Settings({ progress, toggleDarkMode, resetProgress }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowConfirm(false);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Customize your learning experience</p>
        </div>

        <div className="settings-list animate-fade-in">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Dark Mode</h3>
              <p>Switch between light and dark themes</p>
            </div>
            <button 
              className={`toggle-switch ${progress.settings.darkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-knob"></span>
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Sound Effects</h3>
              <p>Play sounds for correct/incorrect answers</p>
            </div>
            <button 
              className={`toggle-switch ${progress.settings.soundEnabled ? 'active' : ''}`}
              disabled
              aria-label="Toggle sound (coming soon)"
            >
              <span className="toggle-knob"></span>
            </button>
            <span className="coming-soon">Coming Soon</span>
          </div>

          <div className="setting-divider"></div>

          <div className="setting-item danger">
            <div className="setting-info">
              <h3>Reset All Progress</h3>
              <p>Clear all your learning data and start fresh</p>
            </div>
            <button 
              className="btn btn-error btn-sm"
              onClick={() => setShowConfirm(true)}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="settings-stats animate-fade-in">
          <h3>Your Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Sessions</span>
              <span className="stat-value">{progress.totalSessions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">{progress.streak} days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Characters Practiced</span>
              <span className="stat-value">{Object.keys(progress.characters).length} / 76</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Practice</span>
              <span className="stat-value">
                {progress.lastPracticeDate || 'Never'}
              </span>
            </div>
          </div>
        </div>

        <div className="settings-about animate-fade-in">
          <h3>About</h3>
          <p>
            Hiragana Master is a free, open-source learning tool designed to help you 
            master Japanese hiragana characters through interactive flashcards and quizzes.
          </p>
          <p className="version">Version 1.0.0</p>
        </div>

        {showConfirm && (
          <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>Reset Progress?</h3>
              <p>This will delete all your learning data, including:</p>
              <ul>
                <li>All character statistics</li>
                <li>Your streak count</li>
                <li>Session history</li>
              </ul>
              <p><strong>This cannot be undone.</strong></p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
                <button className="btn btn-error" onClick={handleReset}>
                  Yes, Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .settings-list {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
        }

        .setting-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-item.danger .setting-info h3 {
          color: var(--error);
        }

        .setting-info {
          flex: 1;
        }

        .setting-info h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .setting-info p {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .toggle-switch {
          position: relative;
          width: 52px;
          height: 28px;
          background: var(--bg-tertiary);
          border: 2px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .toggle-switch:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .toggle-switch.active {
          background: var(--primary);
          border-color: var(--primary);
        }

        .toggle-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform var(--transition-fast);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle-switch.active .toggle-knob {
          transform: translateX(24px);
        }

        .coming-soon {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .setting-divider {
          height: 1px;
          background: var(--border);
          margin: 0.5rem 1.5rem;
        }

        .settings-stats {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .settings-stats h3 {
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-item .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stat-item .stat-value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .settings-about {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .settings-about h3 {
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .settings-about p {
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .version {
          color: var(--text-muted);
          font-size: 0.75rem !important;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          padding: 2rem;
          max-width: 400px;
          width: 100%;
          animation: modalIn 0.2s ease;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal h3 {
          margin-bottom: 1rem;
          color: var(--error);
        }

        .modal p {
          margin-bottom: 0.5rem;
        }

        .modal ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
          color: var(--text-muted);
        }

        .modal li {
          margin-bottom: 0.25rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .modal-actions .btn {
          flex: 1;
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
