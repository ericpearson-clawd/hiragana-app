import { Link } from 'react-router-dom';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import ReviewSchedule from '../components/ReviewSchedule';
import WeakCharacters from '../components/WeakCharacters';
import PracticeRecommendations from '../components/PracticeRecommendations';

export default function Home({ progress, getOverallMastery, getUnpracticedCount, getMastery, currentScript = 'hiragana' }) {
  const mastery = getOverallMastery();
  const unpracticed = getUnpracticedCount();
  const practiced = 109 - unpracticed;
  const longestStreak = progress.longestStreak || progress.streak;

  // Calculate mastery distribution
  const getMasteryDistribution = () => {
    const chars = Object.keys(progress.characters);
    const distribution = {
      new: 109 - chars.length,
      apprentice: 0,  // 1-49%
      guru: 0,        // 50-79%
      master: 0,      // 80-94%
      enlightened: 0  // 95-100%
    };

    chars.forEach(char => {
      const m = getMastery(char);
      if (m < 50) distribution.apprentice++;
      else if (m < 80) distribution.guru++;
      else if (m < 95) distribution.master++;
      else distribution.enlightened++;
    });

    return distribution;
  };

  const distribution = getMasteryDistribution();

  return (
    <div className="page">
      <div className="container">
        <div className="home-hero animate-fade-in">
          <h1 className="home-title">
            Master <span className="gradient-text">{currentScript === 'hiragana' ? 'Hiragana' : 'Katakana'}</span>
          </h1>
          <p className="home-subtitle">
            Learn all 109 Japanese {currentScript} characters through interactive flashcards and quizzes
          </p>
        </div>

        {/* Enhanced Streak Display */}
        <div className="streak-banner animate-fade-in">
          <div className="streak-main">
            <div className="streak-flame">🔥</div>
            <div className="streak-info">
              <div className="streak-current">{progress.streak}</div>
              <div className="streak-label">Day Streak</div>
            </div>
          </div>
          {longestStreak > progress.streak && (
            <div className="streak-best">
              <span className="streak-best-label">Best:</span>
              <span className="streak-best-value">{longestStreak} days</span>
            </div>
          )}
        </div>

        {/* Mastery Distribution */}
        <div className="mastery-overview animate-slide-up">
          <h3 className="mastery-title">Mastery Progress</h3>
          <div className="mastery-bars">
            {distribution.enlightened > 0 && (
              <div className="mastery-bar-row enlightened">
                <div className="mastery-bar-label">
                  <span className="mastery-dot"></span>
                  Enlightened ({distribution.enlightened})
                </div>
                <AnimatedProgressBar 
                  value={distribution.enlightened} 
                  max={109} 
                  height="12px"
                  showPercentage={false}
                  color="var(--enlightened-color)"
                />
              </div>
            )}
            {distribution.master > 0 && (
              <div className="mastery-bar-row master">
                <div className="mastery-bar-label">
                  <span className="mastery-dot"></span>
                  Master ({distribution.master})
                </div>
                <AnimatedProgressBar 
                  value={distribution.master} 
                  max={109} 
                  height="12px"
                  showPercentage={false}
                  color="var(--master-color)"
                />
              </div>
            )}
            {distribution.guru > 0 && (
              <div className="mastery-bar-row guru">
                <div className="mastery-bar-label">
                  <span className="mastery-dot"></span>
                  Guru ({distribution.guru})
                </div>
                <AnimatedProgressBar 
                  value={distribution.guru} 
                  max={109} 
                  height="12px"
                  showPercentage={false}
                  color="var(--guru-color)"
                />
              </div>
            )}
            {distribution.apprentice > 0 && (
              <div className="mastery-bar-row apprentice">
                <div className="mastery-bar-label">
                  <span className="mastery-dot"></span>
                  Apprentice ({distribution.apprentice})
                </div>
                <AnimatedProgressBar 
                  value={distribution.apprentice} 
                  max={109} 
                  height="12px"
                  showPercentage={false}
                  color="var(--apprentice-color)"
                />
              </div>
            )}
            {distribution.new > 0 && (
              <div className="mastery-bar new">
                <div className="mastery-bar-label">
                  <span className="mastery-dot"></span>
                  New
                </div>
                <div className="mastery-bar-fill" style={{ width: `${(distribution.new / 109) * 100}%` }}>
                  <span className="mastery-bar-count">{distribution.new}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="stats-grid animate-slide-up">
          <div className="card stat-card">
            <div className="stat-value">{practiced}</div>
            <div className="stat-label">Characters Seen</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{mastery}%</div>
            <div className="stat-label">Overall Mastery</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{progress.totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{progress.perfectSessions || 0}</div>
            <div className="stat-label">Perfect Sessions</div>
          </div>
        </div>

        {/* Practice Recommendations */}
        <div className="animate-slide-up">
          <PracticeRecommendations 
            characters={progress.characters}
            progress={progress}
          />
        </div>

        {/* Review Schedule */}
        <div className="animate-slide-up">
          <ReviewSchedule characters={progress.characters} />
        </div>

        {/* Weak Characters */}
        <div className="animate-slide-up">
          <WeakCharacters characters={progress.characters} />
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
              <span className="info-label">Basic {currentScript === 'hiragana' ? 'Hiragana' : 'Katakana'}</span>
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
        .streak-banner {
          background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }

        .streak-main {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .streak-flame {
          font-size: 3rem;
          animation: flicker 2s ease-in-out infinite;
        }

        @keyframes flicker {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.1); filter: brightness(1.2); }
        }

        .streak-info {
          color: white;
        }

        .streak-current {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .streak-label {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-top: 0.25rem;
        }

        .streak-best {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          color: white;
          opacity: 0.9;
        }

        .streak-best-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .streak-best-value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .mastery-overview {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .mastery-title {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mastery-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mastery-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mastery-bar-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .mastery-dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        .mastery-bar.new .mastery-dot { background: #94A3B8; }
        .mastery-bar.apprentice .mastery-dot { background: #F59E0B; }
        .mastery-bar.guru .mastery-dot { background: #3B82F6; }
        .mastery-bar.master .mastery-dot { background: #A855F7; }
        .mastery-bar.enlightened .mastery-dot { background: #10B981; }

        .mastery-bar-fill {
          flex: 1;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 0.75rem;
          transition: width 0.6s ease;
          position: relative;
          overflow: hidden;
        }

        .mastery-bar.new .mastery-bar-fill { 
          background: linear-gradient(90deg, #94A3B8 0%, #CBD5E1 100%);
        }
        .mastery-bar.apprentice .mastery-bar-fill { 
          background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%);
        }
        .mastery-bar.guru .mastery-bar-fill { 
          background: linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%);
        }
        .mastery-bar.master .mastery-bar-fill { 
          background: linear-gradient(90deg, #A855F7 0%, #C084FC 100%);
        }
        .mastery-bar.enlightened .mastery-bar-fill { 
          background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
        }

        .mastery-bar-count {
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

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

          .streak-banner {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .streak-best {
            align-items: center;
          }

          .mastery-bar-label {
            min-width: 100px;
            font-size: 0.75rem;
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
