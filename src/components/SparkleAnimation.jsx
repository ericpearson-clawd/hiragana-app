import { useEffect, useState } from 'react';

export default function SparkleAnimation({ trigger = false, onComplete }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (trigger) {
      // Generate 10-15 sparkles
      const newSparkles = Array.from({ length: 12 }, (_, i) => ({
        id: `sparkle-${Date.now()}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 0.6 + Math.random() * 0.4,
        size: 8 + Math.random() * 8
      }));
      
      setSparkles(newSparkles);
      
      // Clear sparkles after animation
      const timeout = setTimeout(() => {
        setSparkles([]);
        if (onComplete) onComplete();
      }, 1200);
      
      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete]);

  if (sparkles.length === 0) return null;

  return (
    <div className="sparkle-container">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`
          }}
        >
          ✨
        </div>
      ))}
      
      <style>{`
        .sparkle-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .sparkle {
          position: absolute;
          top: 50%;
          font-size: 1rem;
          animation: sparkleRise linear forwards;
        }
        
        @keyframes sparkleRise {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
