import { useAchievements } from '../hooks/useAchievements';
import { useProgress } from '../hooks/useProgress';

export default function Achievements() {
  const { progress, getMastery } = useProgress();
  const { getAllAchievements, getUnlockedCount, getTotalCount } = useAchievements(progress, getMastery);
  
  const achievements = getAllAchievements();
  const unlockedCount = getUnlockedCount();
  const totalCount = getTotalCount();
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Achievements</h1>
          <p className="page-subtitle">
            {unlockedCount} of {totalCount} unlocked ({completionPercent}%)
          </p>
        </div>

        <div className="achievements-progress animate-fade-in">
          <div className="progress-ring">
            <svg viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${completionPercent * 3.39} 339`}
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-ring-text">
              <div className="progress-ring-percent">{completionPercent}%</div>
            </div>
          </div>
        </div>

        <div className="achievements-grid animate-slide-up">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-card-icon">{achievement.icon}</div>
              <div className="achievement-card-content">
                <h3 className="achievement-card-title">{achievement.title}</h3>
                <p className="achievement-card-description">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <div className="achievement-badge">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-progress {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .progress-ring {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .progress-ring svg {
          width: 100%;
          height: 100%;
        }

        .progress-ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .progress-ring-percent {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .achievement-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .achievement-card.unlocked {
          border-color: #FFD700;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%);
        }

        .achievement-card.locked {
          opacity: 0.5;
        }

        .achievement-card.unlocked:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }

        .achievement-card-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .achievement-card.locked .achievement-card-icon {
          filter: grayscale(1);
          opacity: 0.3;
        }

        .achievement-card-content {
          flex: 1;
        }

        .achievement-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .achievement-card-description {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .achievement-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
        }

        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .achievement-card {
            padding: 1rem;
          }

          .achievement-card-icon {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
