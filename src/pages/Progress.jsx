import { useState } from 'react';
import { hiragana, groups, yoonGroups, TOTAL_ALL } from '../data/hiragana';
import { playHiragana } from '../utils/audio';

export default function Progress({ progress, getMastery, getOverallMastery }) {
  const [selectedChar, setSelectedChar] = useState(null);
  const [filter, setFilter] = useState('all'); // all, basic, dakuten, handakuten

  const overallMastery = getOverallMastery();
  const practiced = Object.keys(progress.characters).length;

  const getMasteryLevel = (mastery) => {
    if (mastery === 0) return 'new';
    if (mastery < 50) return 'learning';
    if (mastery < 80) return 'familiar';
    return 'mastered';
  };

  const filteredGroups = [...groups, ...yoonGroups].filter(g => {
    if (filter === 'all') return true;
    if (filter === 'basic') return !['g', 'z', 'd', 'b', 'p'].includes(g.id) && !g.id.includes('yoon');
    if (filter === 'dakuten') return ['g', 'z', 'd', 'b'].includes(g.id);
    if (filter === 'handakuten') return g.id === 'p';
    if (filter === 'yoon') return g.id.includes('yoon');
    return true;
  });

  const getCharStats = (char) => {
    const stats = progress.characters[char];
    if (!stats) return { correct: 0, incorrect: 0, total: 0, lastSeen: null };
    return {
      ...stats,
      total: stats.correct + stats.incorrect,
    };
  };

  const selectedCharData = selectedChar ? {
    ...hiragana.find(h => h.char === selectedChar),
    ...getCharStats(selectedChar),
    mastery: getMastery(selectedChar),
  } : null;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Your Progress</h1>
          <p className="page-subtitle">Track your hiragana mastery</p>
        </div>

        <div className="progress-overview animate-fade-in">
          <div className="overview-card">
            <div className="overview-circle">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--bg-tertiary)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${overallMastery * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="overview-percent">{overallMastery}%</div>
            </div>
            <div className="overview-label">Overall Mastery</div>
          </div>
          
          <div className="overview-stats">
            <div className="overview-stat">
              <span className="stat-value">{practiced}</span>
              <span className="stat-label">Characters Seen</span>
            </div>
            <div className="overview-stat">
              <span className="stat-value">{76 - practiced}</span>
              <span className="stat-label">Not Started</span>
            </div>
            <div className="overview-stat">
              <span className="stat-value">{progress.streak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </div>

        <div className="filter-tabs animate-fade-in">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All (109)
          </button>
          <button 
            className={`filter-tab ${filter === 'basic' ? 'active' : ''}`}
            onClick={() => setFilter('basic')}
          >
            Basic (46)
          </button>
          <button 
            className={`filter-tab ${filter === 'dakuten' ? 'active' : ''}`}
            onClick={() => setFilter('dakuten')}
          >
            Dakuten (20)
          </button>
          <button 
            className={`filter-tab ${filter === 'handakuten' ? 'active' : ''}`}
            onClick={() => setFilter('handakuten')}
          >
            Handakuten (5)
          </button>
          <button 
            className={`filter-tab ${filter === 'yoon' ? 'active' : ''}`}
            onClick={() => setFilter('yoon')}
          >
            Yōon (33)
          </button>
        </div>

        <div className="mastery-legend">
          <div className="legend-item">
            <span className="legend-dot new"></span>
            <span>New</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot learning"></span>
            <span>Learning</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot familiar"></span>
            <span>Familiar</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot mastered"></span>
            <span>Mastered</span>
          </div>
        </div>

        <div className="character-groups animate-slide-up">
          {filteredGroups.map(group => {
            const groupChars = hiragana.filter(h => h.group === group.id);
            return (
              <div key={group.id} className="character-group">
                <h3 className="group-title">{group.name}</h3>
                <div className="character-grid">
                  {groupChars.map(char => {
                    const mastery = getMastery(char.char);
                    const level = getMasteryLevel(mastery);
                    return (
                      <button
                        key={char.char}
                        className={`mastery-badge ${level} ${selectedChar === char.char ? 'selected' : ''}`}
                        onClick={() => {
                          playHiragana(char.char, char.romaji);
                          setSelectedChar(selectedChar === char.char ? null : char.char);
                        }}
                      >
                        {char.char}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {selectedCharData && (
          <div className="character-detail animate-fade-in">
            <div className="detail-header">
              <span className="detail-char jp">{selectedCharData.char}</span>
              <span className="detail-romaji">{selectedCharData.romaji}</span>
            </div>
            <div className="detail-stats">
              <div className="detail-stat">
                <span className="detail-stat-value">{selectedCharData.mastery}%</span>
                <span className="detail-stat-label">Mastery</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value" style={{ color: 'var(--success)' }}>
                  {selectedCharData.correct}
                </span>
                <span className="detail-stat-label">Correct</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value" style={{ color: 'var(--error)' }}>
                  {selectedCharData.incorrect}
                </span>
                <span className="detail-stat-label">Wrong</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value">{selectedCharData.total}</span>
                <span className="detail-stat-label">Total</span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedChar(null)}>
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        .progress-overview {
          display: flex;
          align-items: center;
          gap: 3rem;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          margin-bottom: 2rem;
        }

        .overview-card {
          text-align: center;
        }

        .overview-circle {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .overview-circle svg {
          width: 100%;
          height: 100%;
        }

        .overview-percent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .overview-label {
          margin-top: 0.5rem;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .overview-stats {
          display: flex;
          gap: 2rem;
        }

        .overview-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .overview-stat .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .overview-stat .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          color: var(--text-secondary);
        }

        .filter-tab:hover {
          border-color: var(--primary-light);
        }

        .filter-tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .mastery-legend {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }

        .legend-dot.new { background: var(--bg-tertiary); }
        .legend-dot.learning { background: rgba(245, 158, 11, 0.5); }
        .legend-dot.familiar { background: rgba(99, 102, 241, 0.5); }
        .legend-dot.mastered { background: rgba(16, 185, 129, 0.5); }

        .character-groups {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .character-group {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .group-title {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .character-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .mastery-badge {
          cursor: pointer;
          border: 2px solid transparent;
        }

        .mastery-badge:hover {
          transform: scale(1.1);
        }

        .mastery-badge.selected {
          border-color: var(--primary);
          transform: scale(1.1);
        }

        .character-detail {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: 0 10px 40px var(--shadow);
          z-index: 50;
          min-width: 300px;
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detail-char {
          font-family: var(--font-jp);
          font-size: 3rem;
          color: var(--primary);
        }

        .detail-romaji {
          font-size: 1.5rem;
          color: var(--text-secondary);
        }

        .detail-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .detail-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-stat-value {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .detail-stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .progress-overview {
            flex-direction: column;
            text-align: center;
          }

          .overview-stats {
            justify-content: center;
          }

          .character-detail {
            left: 1rem;
            right: 1rem;
            transform: none;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}
