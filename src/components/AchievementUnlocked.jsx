import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function AchievementUnlocked({ achievement, onDismiss }) {
  useEffect(() => {
    if (achievement) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <>
      <div className="achievement-overlay" onClick={onDismiss} />
      <div className="achievement-popup animate-bounce-in">
        <div className="achievement-icon">{achievement.icon}</div>
        <div className="achievement-content">
          <div className="achievement-badge">🏆 Achievement Unlocked!</div>
          <h3 className="achievement-title">{achievement.title}</h3>
          <p className="achievement-description">{achievement.description}</p>
        </div>
        <button className="achievement-close" onClick={onDismiss}>×</button>
      </div>

      <style>{`
        .achievement-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        .achievement-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }

        .achievement-icon {
          font-size: 64px;
          margin-bottom: 1rem;
          animation: bounce 1s ease infinite;
        }

        .achievement-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .achievement-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .achievement-description {
          font-size: 1rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .achievement-close {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .achievement-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
          }
          70% {
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}
