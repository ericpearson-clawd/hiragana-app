import { Link } from 'react-router-dom';

export default function Home({ progress, getOverallMastery, getUnpracticedCount }) {
  const mastery = getOverallMastery();
  const unpracticed = getUnpracticedCount();
  const practiced = 76 - unpracticed;

  return (
    <div className="page">
      <div className="container">
        <div className="home-hero animate-fade-in">
          <h1 className="home-title">
            Master <span className="gradient-text">Hiragana</span>
          </h1>
          <p className="home-subtitle">
            Learn all 109 Japanese hiragana characters through interactive flashcards and quizzes
          </p>
        </div>

        <div className="stats-grid animate-slide-up">
          <div className="card stat-card">
            <div className="stat-value">{progress.streak}</div>
            <div className="stat-label">Day Streak 🔥</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{practiced}</div>
            <div className="stat-label">Characters Seen</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{mastery}%</div>
            <div className="stat-label">Mastery</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{progress.totalSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
        </div>

        <div className="home-actions animate-slide-up">
          <Link to="/flashcards" className="action-card">
            <div className="action-icon">🎴</div>
            <div className="action-content">
              <h3>Flashcards</h3>
              <p>Learn characters at your own pace</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
          
          <Link to="/quiz" className="action-card">
            <div className="action-icon">❓</div>
            <div className="action-content">
              <h3>Quiz Mode</h3>
              <p>Test your knowledge</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
          
          <Link to="/progress" className="action-card">
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h3>View Progress</h3>
              <p>See all 109 characters</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
        </div>

        <div className="home-info animate-slide-up">
          <h3>What you'll learn</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-count">46</span>
              <span className="info-label">Basic Hiragana</span>
            </div>
            <div className="info-item">
              <span className="info-count">25</span>
              <span className="info-label">Dakuten/Handakuten</span>
            </div>
            <div className="info-item">
              <span className="info-count">33</span>
              <span className="info-label">Yōon (Combos)</span>
            </div>
            <div className="info-item">
              <span className="info-count">109</span>
              <span className="info-label">Total</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .home-hero {
          text-align: center;
          padding: 3rem 0;
        }

        .home-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .home-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-fast);
        }

        .action-card:hover {
          border-color: var(--primary);
          transform: translateX(8px);
          box-shadow: 0 10px 30px var(--shadow);
        }

        .action-icon {
          font-size: 2.5rem;
        }

        .action-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .action-content p {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .action-arrow {
          margin-left: auto;
          font-size: 1.5rem;
          color: var(--primary);
          transition: transform var(--transition-fast);
        }

        .action-card:hover .action-arrow {
          transform: translateX(4px);
        }

        .home-info {
          text-align: center;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          max-width: 600px;
          margin: 0 auto;
        }

        .home-info h3 {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-count {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary);
        }

        .info-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .home-title {
            font-size: 2rem;
          }

          .home-subtitle {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .home-hero {
            padding: 2rem 0;
          }

          .action-card {
            padding: 1rem;
            gap: 1rem;
          }

          .action-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
