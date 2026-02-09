import { Link, useLocation } from 'react-router-dom';

export default function Header({ darkMode, onToggleTheme }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/flashcards', label: 'Flashcards', icon: '🎴' },
    { path: '/quiz', label: 'Quiz', icon: '❓' },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">あ</span>
            <span className="logo-text">Hiragana Master</span>
          </Link>
          
          <nav className="nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <button 
            className="btn btn-icon btn-ghost theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
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
        
        .nav-icon {
          font-size: 1.25rem;
        }
        
        .theme-toggle {
          font-size: 1.25rem;
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
        }
      `}</style>
    </header>
  );
}
