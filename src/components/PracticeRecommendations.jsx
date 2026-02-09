import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDueReviews, getWeakCharacters } from '../utils/spacedRepetition';

export default function PracticeRecommendations({ characters, progress }) {
  const navigate = useNavigate();
  const dueReviews = getDueReviews(characters);
  const weakChars = getWeakCharacters(characters, 4);
  
  // Calculate recommendations based on user's state
  const recommendations = [];
  
  // Priority 1: Due reviews
  if (dueReviews.length > 0) {
    recommendations.push({
      icon: '🔔',
      title: 'Complete Your Reviews',
      description: `You have ${dueReviews.length} character${dueReviews.length > 1 ? 's' : ''} ready for review`,
      action: () => navigate('/flashcards?mode=review'),
      buttonText: 'Start Reviews',
      priority: 1,
      color: '#22C55E',
    });
  }
  
  // Priority 2: Practice weak characters
  if (weakChars.length >= 5) {
    recommendations.push({
      icon: '💪',
      title: 'Strengthen Weak Areas',
      description: `${weakChars.length} characters need more practice`,
      action: () => navigate('/flashcards?mode=weak'),
      buttonText: 'Practice Weak',
      priority: 2,
      color: '#F59E0B',
    });
  }
  
  // Priority 3: Learn new characters
  const unpracticedCount = 109 - Object.keys(characters).length;
  if (unpracticedCount > 0) {
    recommendations.push({
      icon: '✨',
      title: 'Learn New Characters',
      description: `${unpracticedCount} characters left to learn`,
      action: () => navigate('/flashcards?mode=new'),
      buttonText: 'Learn New',
      priority: 3,
      color: '#3B82F6',
    });
  }
  
  // Priority 4: Random practice if nothing urgent
  if (recommendations.length === 0 && Object.keys(characters).length > 0) {
    recommendations.push({
      icon: '🎲',
      title: 'Random Practice',
      description: 'Keep your skills sharp with mixed practice',
      action: () => navigate('/flashcards'),
      buttonText: 'Random Practice',
      priority: 4,
      color: '#A855F7',
    });
  }
  
  // Priority 5: Take a quiz
  if (Object.keys(characters).length >= 10) {
    recommendations.push({
      icon: '🎯',
      title: 'Test Your Knowledge',
      description: 'Challenge yourself with a timed quiz',
      action: () => navigate('/quiz'),
      buttonText: 'Start Quiz',
      priority: 5,
      color: '#EF4444',
    });
  }
  
  // Sort by priority
  recommendations.sort((a, b) => a.priority - b.priority);
  
  // Show top 3 recommendations
  const topRecommendations = recommendations.slice(0, 3);
  
  if (topRecommendations.length === 0) {
    return (
      <div className="practice-recommendations">
        <h3 className="recommendations-title">🎉 You're All Caught Up!</h3>
        <p className="recommendations-subtitle">
          Come back later for more reviews, or start learning new characters.
        </p>
      </div>
    );
  }
  
  return (
    <div className="practice-recommendations">
      <h3 className="recommendations-title">📚 What to Practice</h3>
      <div className="recommendations-grid">
        {topRecommendations.map((rec, index) => (
          <div 
            key={index} 
            className="recommendation-card"
            style={{ borderTop: `3px solid ${rec.color}` }}
          >
            <span className="recommendation-icon">{rec.icon}</span>
            <h4 className="recommendation-title">{rec.title}</h4>
            <p className="recommendation-description">{rec.description}</p>
            <button 
              className="recommendation-btn"
              onClick={rec.action}
              style={{ 
                backgroundColor: rec.color,
                color: '#FFFFFF' 
              }}
            >
              {rec.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
