import { Link, useLocation } from 'react-router-dom';

export default function Header({ darkMode, onToggleTheme, streak = 0, longestStreak = 0, achievementsUnlocked = 0, achievementsTotal = 8 }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/flashcards', label: 'Flashcards', icon: '🎴' },
    { path: '/quiz', label: 'Quiz', icon: '❓' },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { path: '/achievements', label: 'Achievements', icon: '🏆', badge: achievementsUnlocked > 0 ? achievementsUnlocked : null },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" aria-label="Hiragana Master - Go to home page">
            <span className="logo-icon" aria-hidden="true">あ</span>
            <span className="logo-text">Hiragana Master</span>
          </Link>
          
          {streak > 0 && (
            <div 
              className="streak-badge" 
              title={`Current streak: ${streak} days. Longest streak: ${longestStreak} days`}
              aria-label={`Current streak: ${streak} days`}
            >
              <span className="streak-flame" aria-hidden="true">🔥</span>
              <span className="streak-count">{streak}</span>
            </div>
          )}
          
          <nav className="nav" role="navigation" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                aria-label={`${item.label}${item.badge ? ` (${item.badge} unlocked)` : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="nav-icon-wrapper">
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                  {item.badge && <span className="nav-badge" aria-label={`${item.badge} new`}>{item.badge}</span>}
                </span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <button 
            className="btn btn-icon btn-ghost theme-toggle"
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={darkMode}
          >
            <span aria-hidden="true">{darkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
      
      <style>{`
        .header {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 2rem;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 1.25rem;
        }
        
        .logo-icon {
          font-family: var(--font-jp);
          font-size: 1.75rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav {
          display: flex;
          gap: 0.5rem;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        
        .nav-link:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        
        .nav-link.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
        }
        
        .nav-icon-wrapper {
          position: relative;
          display: inline-flex;
        }
        
        .nav-icon {
          font-size: 1.25rem;
        }
        
        .nav-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.125rem 0.375rem;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
          box-shadow: 0 2px 6px rgba(255, 215, 0, 0.4);
        }
        
        .theme-toggle {
          font-size: 1.25rem;
        }
        
        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-weight: 700;
          color: white;
          font-size: 0.875rem;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
          animation: streakPulse 2s ease-in-out infinite;
        }
        
        @keyframes streakPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .streak-flame {
          font-size: 1.125rem;
          animation: flameFlicker 1.5s ease-in-out infinite;
        }
        
        @keyframes flameFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .streak-count {
          font-size: 1rem;
          line-height: 1;
        }
        
        @media (max-width: 768px) {
          .nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border);
            padding: 0.5rem 0.25rem;
            justify-content: space-around;
            z-index: 100;
          }
          
          .nav-link {
            flex-direction: column;
            padding: 0.5rem 0.25rem;
            font-size: 0.75rem;
            gap: 0.25rem;
            min-width: 0;
          }
          
          .nav-label {
            font-size: 0.6rem;
            white-space: nowrap;
          }
          
          .logo-text {
            display: none;
          }
          
          .header-content {
            height: 56px;
          }
          
          .theme-toggle {
            display: none;
          }
          
          .streak-badge {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
          }
          
          .streak-flame {
            font-size: 1rem;
          }
          
          .streak-count {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </header>
  );
}
