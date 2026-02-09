import { useState, useEffect, useCallback } from 'react';
import { hiragana, shuffle, groups, yoonGroups, allGroups } from '../data/hiragana';

export default function Flashcards({ recordAttempt, updateStreak, getMastery }) {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState(['all']);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [isStarted, setIsStarted] = useState(false);

  // Build deck based on selected groups
  const buildDeck = useCallback(() => {
    let cards = [];
    if (selectedGroups.includes('all')) {
      cards = [...hiragana];
    } else if (selectedGroups.includes('main')) {
      cards = hiragana.filter(h => h.type !== 'yoon');
    } else {
      cards = hiragana.filter(h => selectedGroups.includes(h.group));
    }
    return shuffle(cards);
  }, [selectedGroups]);

  const startSession = () => {
    const newDeck = buildDeck();
    setDeck(newDeck);
    setCurrentIndex(0);
    setFlipped(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    setIsStarted(true);
    updateStreak();
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleResponse = (knew) => {
    const current = deck[currentIndex];
    recordAttempt(current.char, knew);
    
    setSessionStats(prev => ({
      correct: prev.correct + (knew ? 1 : 0),
      incorrect: prev.incorrect + (knew ? 0 : 1),
    }));

    // Move to next card
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      // Session complete
      setIsStarted(false);
    }
  };

  const toggleGroup = (groupId) => {
    if (groupId === 'all' || groupId === 'main') {
      setSelectedGroups([groupId]);
    } else {
      setSelectedGroups(prev => {
        const filtered = prev.filter(g => g !== 'all' && g !== 'main');
        if (filtered.includes(groupId)) {
          const result = filtered.filter(g => g !== groupId);
          return result.length === 0 ? ['all'] : result;
        }
        return [...filtered, groupId];
      });
    }
  };

  const currentCard = deck[currentIndex];
  const progress = deck.length > 0 ? ((currentIndex + 1) / deck.length) * 100 : 0;

  // Session complete screen
  if (!isStarted && sessionStats.correct + sessionStats.incorrect > 0) {
    const total = sessionStats.correct + sessionStats.incorrect;
    const accuracy = Math.round((sessionStats.correct / total) * 100);
    
    return (
      <div className="page">
        <div className="container">
          <div className="session-complete animate-fade-in">
            <div className="complete-icon">🎉</div>
            <h2>Session Complete!</h2>
            <p className="complete-subtitle">You reviewed {total} characters</p>
            
            <div className="complete-stats">
              <div className="complete-stat">
                <span className="complete-stat-value success">{sessionStats.correct}</span>
                <span className="complete-stat-label">Correct</span>
              </div>
              <div className="complete-stat">
                <span className="complete-stat-value error">{sessionStats.incorrect}</span>
                <span className="complete-stat-label">Need Practice</span>
              </div>
              <div className="complete-stat">
                <span className="complete-stat-value">{accuracy}%</span>
                <span className="complete-stat-label">Accuracy</span>
              </div>
            </div>
            
            <div className="complete-actions">
              <button className="btn btn-primary btn-lg" onClick={startSession}>
                Practice Again
              </button>
              <button className="btn btn-secondary" onClick={() => setSessionStats({ correct: 0, incorrect: 0 })}>
                Change Groups
              </button>
            </div>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  // Group selection screen
  if (!isStarted) {
    return (
      <div className="page">
        <div className="container">
          <div className="page-header text-center">
            <h1 className="page-title">Flashcards</h1>
            <p className="page-subtitle">Select which character groups to practice</p>
          </div>

          <div className="group-selection animate-fade-in">
            <button
              className={`group-btn ${selectedGroups.includes('all') ? 'active' : ''}`}
              onClick={() => toggleGroup('all')}
            >
              <span className="group-chars">All</span>
              <span className="group-name">109 characters</span>
            </button>
            
            <button
              className={`group-btn ${selectedGroups.includes('main') ? 'active' : ''}`}
              onClick={() => toggleGroup('main')}
            >
              <span className="group-chars">Main</span>
              <span className="group-name">76 (no yōon)</span>
            </button>
            
            {allGroups.map(group => (
              <button
                key={group.id}
                className={`group-btn ${selectedGroups.includes(group.id) ? 'active' : ''}`}
                onClick={() => toggleGroup(group.id)}
              >
                <span className="group-chars jp">{group.chars}</span>
                <span className="group-name">{group.name}</span>
              </button>
            ))}
          </div>

          <div className="start-action">
            <button className="btn btn-primary btn-lg" onClick={startSession}>
              Start Practice ({
                selectedGroups.includes('all') ? 109 : 
                selectedGroups.includes('main') ? 76 :
                hiragana.filter(h => selectedGroups.includes(h.group)).length
              } cards)
            </button>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  // Flashcard practice screen
  return (
    <div className="page">
      <div className="container">
        <div className="flashcard-header">
          <div className="progress-info">
            <span>{currentIndex + 1} / {deck.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flashcard-area" onClick={handleFlip}>
          <div className={`character-card ${flipped ? 'flipped' : ''}`}>
            <div className="character-card-inner">
              <div className="character-card-front">
                <div className="hiragana-display jp">{currentCard?.char}</div>
                <div className="card-hint">Tap to reveal</div>
              </div>
              <div className="character-card-back">
                <div className="hiragana-display jp">{currentCard?.char}</div>
                <div className="romaji-display">{currentCard?.romaji}</div>
              </div>
            </div>
          </div>
        </div>

        {flipped && (
          <div className="response-buttons animate-fade-in">
            <button 
              className="btn btn-error btn-lg response-btn"
              onClick={(e) => { e.stopPropagation(); handleResponse(false); }}
            >
              😕 Still Learning
            </button>
            <button 
              className="btn btn-success btn-lg response-btn"
              onClick={(e) => { e.stopPropagation(); handleResponse(true); }}
            >
              😊 I Knew It!
            </button>
          </div>
        )}

        {!flipped && (
          <div className="skip-hint">
            <button className="btn btn-ghost" onClick={() => handleResponse(false)}>
              Skip →
            </button>
          </div>
        )}
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .flashcard-header {
    max-width: 400px;
    margin: 0 auto 2rem;
  }

  .progress-info {
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--text-muted);
    font-size: 0.875rem;
  }

  .flashcard-area {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 350px;
    margin-bottom: 2rem;
  }

  .card-hint {
    position: absolute;
    bottom: 1.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .response-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .response-btn {
    flex: 1;
  }

  .skip-hint {
    text-align: center;
  }

  .group-selection {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .group-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .group-btn:hover {
    border-color: var(--primary-light);
    background: var(--bg-tertiary);
  }

  .group-btn.active {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
  }

  .group-chars {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.1em;
  }

  .group-name {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .start-action {
    text-align: center;
  }

  .session-complete {
    text-align: center;
    padding: 3rem 1rem;
  }

  .complete-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .complete-subtitle {
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  .complete-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .complete-stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .complete-stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .complete-stat-value.success {
    color: var(--success);
  }

  .complete-stat-value.error {
    color: var(--error);
  }

  .complete-stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .complete-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  @media (max-width: 640px) {
    .group-selection {
      grid-template-columns: repeat(2, 1fr);
    }

    .response-buttons {
      flex-direction: column;
    }

    .complete-stats {
      gap: 1.5rem;
    }

    .complete-stat-value {
      font-size: 2rem;
    }
  }
`;
