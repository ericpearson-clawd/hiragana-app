import React from 'react';
import { getWeakCharacters, getSRSLevelColor } from '../utils/spacedRepetition';
import { useNavigate } from 'react-router-dom';

export default function WeakCharacters({ characters }) {
  const navigate = useNavigate();
  const weakChars = getWeakCharacters(characters, 5); // SRS level < 5
  
  // Show top 10 weakest characters
  const topWeak = weakChars.slice(0, 10);
  
  const handlePracticeWeak = () => {
    // Navigate to flashcards with weak filter
    navigate('/flashcards?mode=weak');
  };
  
  if (topWeak.length === 0) {
    return null;
  }
  
  return (
    <div className="weak-characters">
      <div className="weak-header">
        <h3 className="weak-title">💪 Characters Needing Practice</h3>
        <span className="weak-count">{weakChars.length} total</span>
      </div>
      
      <div className="weak-grid">
        {topWeak.map(({ char, srsLevel, accuracy }) => (
          <div 
            key={char} 
            className="weak-char-item"
            style={{
              borderLeft: `4px solid ${getSRSLevelColor(srsLevel || 0)}`
            }}
          >
            <span className="weak-char">{char}</span>
            <div className="weak-stats">
              <span className="weak-accuracy" 
                style={{ 
                  color: accuracy < 50 ? '#EF4444' : accuracy < 70 ? '#F59E0B' : '#6B7280' 
                }}>
                {accuracy.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="practice-weak-btn"
        onClick={handlePracticeWeak}
      >
        Practice Weak Characters
      </button>
    </div>
  );
}
