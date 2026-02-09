import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { hiragana, shuffle, groups, yoonGroups, allGroups } from '../data/hiragana';
import { getMnemonic } from '../data/mnemonics';
import { playHiragana, isAudioSupported } from '../utils/audio';

export default function Flashcards({ recordAttempt, recordPerfectSession, updateStreak, getMastery, getWeakCharacters, autoPlayAudio = false }) {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState(['all']);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const touchStartRef = useRef(null);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || !flipped) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStartRef.current;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe right = I knew it
        setSwipeDirection('right');
        setTimeout(() => {
          handleResponse(true);
          setSwipeDirection(null);
        }, 200);
      } else {
        // Swipe left = Still learning
        setSwipeDirection('left');
        setTimeout(() => {
          handleResponse(false);
          setSwipeDirection(null);
        }, 200);
      }
    }
    touchStartRef.current = null;
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!isStarted) return;
    
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!flipped) {
          setFlipped(true);
        }
      } else if (flipped) {
        if (e.key === 'ArrowLeft' || e.key === '1') {
          handleResponse(false);
        } else if (e.key === 'ArrowRight' || e.key === '2') {
          handleResponse(true);
        }
      } else if (e.key === 'ArrowRight') {
        handleResponse(false); // Skip
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, flipped, currentIndex, deck]);

  // Build deck based on selected groups
  const buildDeck = useCallback(() => {
    let cards = [];
    if (selectedGroups.includes('all')) {
      cards = [...hiragana];
    } else if (selectedGroups.includes('main')) {
      cards = hiragana.filter(h => h.type !== 'yoon');
    } else if (selectedGroups.includes('weak')) {
      const weakChars = getWeakCharacters(70);
      cards = hiragana.filter(h => weakChars.includes(h.char));
      if (cards.length === 0) {
        // If no weak characters, show all unpracticed
        const practiced = new Set(Object.keys(JSON.parse(localStorage.getItem('hiragana-master-progress') || '{}')?.characters || {}));
        cards = hiragana.filter(h => !practiced.has(h.char)).slice(0, 20);
        if (cards.length === 0) {
          cards = [...hiragana]; // Fallback to all
        }
      }
    } else {
      cards = hiragana.filter(h => selectedGroups.includes(h.group));
    }
    return shuffle(cards);
  }, [selectedGroups, getWeakCharacters]);

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
    if (!flipped && currentCard && autoPlayAudio) {
      // Auto-play audio when revealing the answer (if enabled in settings)
      playHiragana(
        currentCard.char, 
        currentCard.romaji,
        () => setIsAudioPlaying(true),
        () => setIsAudioPlaying(false)
      );
    }
    setFlipped(!flipped);
  };

  const handlePlayAudio = (e) => {
    e.stopPropagation();
    if (currentCard) {
      playHiragana(
        currentCard.char, 
        currentCard.romaji,
        () => setIsAudioPlaying(true),
        () => setIsAudioPlaying(false)
      );
    }
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
      setShowHint(false);
    } else {
      // Session complete - trigger confetti if good accuracy
      const total = sessionStats.correct + sessionStats.incorrect + 1;
      const correctTotal = sessionStats.correct + (knew ? 1 : 0);
      const accuracy = correctTotal / total;
      
      if (accuracy >= 0.8) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Record perfect session achievement
      if (accuracy === 1.0) {
        recordPerfectSession();
      }
      
      setIsStarted(false);
    }
  };

  const toggleGroup = (groupId) => {
    if (groupId === 'all' || groupId === 'main' || groupId === 'weak') {
      setSelectedGroups([groupId]);
    } else {
      setSelectedGroups(prev => {
        const filtered = prev.filter(g => g !== 'all' && g !== 'main' && g !== 'weak');
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
            
            <button
              className={`group-btn weak ${selectedGroups.includes('weak') ? 'active' : ''}`}
              onClick={() => toggleGroup('weak')}
            >
              <span className="group-chars">🎯</span>
              <span className="group-name">Weak Characters</span>
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
                selectedGroups.includes('weak') ? 'Focus' :
                hiragana.filter(h => selectedGroups.includes(h.group)).length
              } {selectedGroups.includes('weak') ? 'Mode' : 'cards'})
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

        <div 
          className={`flashcard-area ${swipeDirection ? `swipe-${swipeDirection}` : ''}`} 
          onClick={handleFlip}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`character-card ${flipped ? 'flipped' : ''}`}>
            <div className="character-card-inner">
              <div className="character-card-front">
                <div className="hiragana-display jp">{currentCard?.char}</div>
                <div className="card-hint">Tap to reveal</div>
              </div>
              <div className="character-card-back">
                <button 
                  className={`audio-btn ${isAudioPlaying ? 'playing' : ''}`}
                  onClick={handlePlayAudio}
                  title="Play pronunciation"
                  aria-label="Play audio"
                >
                  🔊
                </button>
                <div className="hiragana-display jp">{currentCard?.char}</div>
                <div className="romaji-display">{currentCard?.romaji}</div>
                {showHint && getMnemonic(currentCard?.char) && (
                  <div className="mnemonic-hint">💡 {getMnemonic(currentCard?.char)}</div>
                )}
                <button 
                  className="hint-btn"
                  onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                >
                  {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
                </button>
                <div className="swipe-hint">← Swipe to respond →</div>
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
              <span className="response-key">←</span> 😕 Still Learning
            </button>
            <button 
              className="btn btn-success btn-lg response-btn"
              onClick={(e) => { e.stopPropagation(); handleResponse(true); }}
            >
              😊 I Knew It! <span className="response-key">→</span>
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
    margin: 0 auto var(--space-xl);
  }

  .progress-info {
    text-align: center;
    margin-bottom: var(--space-sm);
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .flashcard-area {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 350px;
    margin-bottom: var(--space-xl);
    transition: transform 0.2s ease;
  }

  .flashcard-area.swipe-left {
    transform: translateX(-100px) rotate(-5deg);
    opacity: 0.5;
  }

  .flashcard-area.swipe-right {
    transform: translateX(100px) rotate(5deg);
    opacity: 0.5;
  }

  .swipe-hint {
    position: absolute;
    bottom: var(--space-md);
    font-size: var(--font-size-sm);
    color: rgba(255,255,255,0.8);
  }

  @media (min-width: 769px) {
    .swipe-hint {
      display: none;
    }
  }

  .mnemonic-hint {
    position: absolute;
    top: var(--space-md);
    left: var(--space-md);
    right: var(--space-md);
    background: rgba(255,255,255,0.15);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    color: rgba(255,255,255,0.95);
    animation: feedback-flash 0.3s ease;
  }

  .hint-btn {
    position: absolute;
    bottom: var(--space-2xl);
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: var(--space-sm) var(--space-md);
    min-height: var(--touch-min);
    border-radius: 20px;
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .hint-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.05);
  }

  .audio-btn {
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    width: var(--touch-min);
    height: var(--touch-min);
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    font-size: var(--font-size-xl);
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .audio-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
  }

  .audio-btn:active {
    transform: scale(0.95);
  }

  .audio-btn:focus-visible {
    outline: 2px solid var(--feedback-focus);
    outline-offset: 2px;
  }

  .audio-btn.playing {
    animation: audioPlaying 0.6s ease-in-out infinite;
    background: var(--feedback-focus);
    border-color: var(--feedback-focus);
  }

  @keyframes audioPlaying {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  .card-hint {
    position: absolute;
    bottom: var(--space-lg);
    font-size: var(--font-size-sm);
    color: var(--text-muted);
  }

  .response-buttons {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .response-btn {
    flex: 1;
    animation: feedback-flash 0.3s ease;
  }

  .response-key {
    display: inline-block;
    padding: var(--space-xs) var(--space-sm);
    background: rgba(255,255,255,0.2);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    margin: 0 var(--space-xs);
  }

  .skip-hint {
    text-align: center;
  }

  .group-selection {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-md);
    max-width: 800px;
    margin: 0 auto var(--space-xl);
  }

  .group-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    min-height: var(--touch-large);
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .group-btn:hover {
    border-color: var(--feedback-focus);
    background: var(--bg-tertiary);
    transform: scale(1.02);
  }

  .group-btn:focus-visible {
    outline: 2px solid var(--feedback-focus);
    outline-offset: 2px;
  }

  .group-btn.active {
    border-color: var(--primary);
    background: rgba(79, 70, 229, 0.1);
    animation: pulse-success 0.3s ease;
  }

  .group-btn.weak {
    border-color: var(--warning);
  }

  .group-btn.weak.active {
    background: rgba(245, 158, 11, 0.1);
    border-color: var(--warning);
  }

  .group-chars {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.1em;
  }

  .group-name {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
  }

  .start-action {
    text-align: center;
  }

  .session-complete {
    text-align: center;
    padding: var(--space-2xl) var(--space-md);
    animation: fadeIn 0.4s ease;
  }

  .complete-icon {
    font-size: 64px;
    margin-bottom: var(--space-md);
  }

  .complete-subtitle {
    color: var(--text-muted);
    margin-bottom: var(--space-xl);
    font-size: var(--font-size-lg);
  }

  .complete-stats {
    display: flex;
    justify-content: center;
    gap: var(--space-2xl);
    margin-bottom: var(--space-xl);
  }

  .complete-stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .complete-stat-value {
    font-size: 40px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .complete-stat-value.success {
    color: var(--feedback-correct);
  }

  .complete-stat-value.error {
    color: var(--feedback-incorrect);
  }

  .complete-stat-label {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .complete-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: center;
  }

  @media (max-width: 640px) {
    .group-selection {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
    }

    .response-buttons {
      flex-direction: column;
      gap: var(--space-md);
    }

    .complete-stats {
      gap: var(--space-lg);
    }

    .complete-stat-value {
      font-size: var(--font-size-3xl);
    }

    .container {
      padding: 0 var(--space-md);
    }
  }
`;
