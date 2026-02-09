import { useState, useEffect } from 'react';

export default function AnimatedProgressBar({ 
  value, 
  max = 100, 
  height = '8px',
  showPercentage = true,
  animated = true,
  color = 'var(--primary)'
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min(100, Math.round((value / max) * 100));

  useEffect(() => {
    if (animated) {
      // Animate from 0 to target percentage
      const timeout = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="animated-progress-container">
      <div className="animated-progress-bar" style={{ height }}>
        <div 
          className="animated-progress-fill"
          style={{ 
            width: `${animatedValue}%`,
            background: color
          }}
        >
          {showPercentage && percentage > 10 && (
            <span className="progress-percentage">{percentage}%</span>
          )}
        </div>
      </div>
      {showPercentage && percentage <= 10 && (
        <span className="progress-percentage-outside">{percentage}%</span>
      )}
      
      <style>{`
        .animated-progress-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .animated-progress-bar {
          flex: 1;
          background: var(--bg-tertiary);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        
        .animated-progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .animated-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .progress-percentage {
          font-size: 0.625rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          z-index: 1;
        }
        
        .progress-percentage-outside {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          min-width: 2.5rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
