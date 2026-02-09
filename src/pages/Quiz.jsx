import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { hiragana, shuffle } from '../data/hiragana';

export default function Quiz({ recordAttempt, updateStreak }) {
  const [quizMode, setQuizMode] = useState(null); // 'reading' or 'recognition'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [streak, setStreak] = useState(0);

  // Keyboard shortcuts
  useEffect(() => {
    if (!quizMode || quizMode === 'complete') return;
    
    const handleKeyDown = (e) => {
      if (showResult) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          nextQuestion();
        }
      } else {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= 4) {
          const option = questions[currentIndex]?.options[keyNum - 1];
          if (option) handleAnswer(option);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizMode, showResult, currentIndex, questions]);

  const generateQuestions = useCallback((mode) => {
    const shuffled = shuffle([...hiragana]);
    const selected = shuffled.slice(0, 20); // 20 questions per quiz
    
    return selected.map(item => {
      // Get 3 wrong answers
      const others = hiragana.filter(h => h.romaji !== item.romaji);
      const wrongAnswers = shuffle(others).slice(0, 3);
      
      if (mode === 'reading') {
        // Show hiragana, pick romaji
        const options = shuffle([
          { value: item.romaji, correct: true },
          ...wrongAnswers.map(w => ({ value: w.romaji, correct: false }))
        ]);
        return { display: item.char, displayType: 'hiragana', options, char: item.char };
      } else {
        // Show romaji, pick hiragana
        const options = shuffle([
          { value: item.char, correct: true },
          ...wrongAnswers.map(w => ({ value: w.char, correct: false }))
        ]);
        return { display: item.romaji, displayType: 'romaji', options, char: item.char };
      }
    });
  }, []);

  const startQuiz = (mode) => {
    setQuizMode(mode);
    setQuestions(generateQuestions(mode));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setSessionStats({ correct: 0, incorrect: 0 });
    setStreak(0);
    updateStreak();
  };

  const handleAnswer = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    setShowResult(true);
    
    const current = questions[currentIndex];
    recordAttempt(current.char, option.correct);
    
    if (option.correct) {
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setStreak(prev => prev + 1);
    } else {
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete - trigger confetti if good score
      const total = sessionStats.correct + sessionStats.incorrect + 1;
      const accuracy = (sessionStats.correct + (selectedAnswer?.correct ? 1 : 0)) / total * 100;
      if (accuracy >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setQuizMode('complete');
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Quiz complete screen
  if (quizMode === 'complete') {
    const total = sessionStats.correct + sessionStats.incorrect;
    const accuracy = Math.round((sessionStats.correct / total) * 100);
    
    let grade = 'F';
    let gradeColor = 'var(--error)';
    if (accuracy >= 90) { grade = 'A+'; gradeColor = 'var(--success)'; }
    else if (accuracy >= 80) { grade = 'A'; gradeColor = 'var(--success)'; }
    else if (accuracy >= 70) { grade = 'B'; gradeColor = 'var(--primary)'; }
    else if (accuracy >= 60) { grade = 'C'; gradeColor = 'var(--warning)'; }
    else if (accuracy >= 50) { grade = 'D'; gradeColor = 'var(--warning)'; }
    
    return (
      <div className="page">
        <div className="container">
          <div className="quiz-complete animate-fade-in">
            <div className="complete-grade" style={{ color: gradeColor }}>{grade}</div>
            <h2>Quiz Complete!</h2>
            <p className="complete-subtitle">You answered {total} questions</p>
            
            <div className="complete-stats">
              <div className="complete-stat">
                <span className="complete-stat-value" style={{ color: 'var(--success)' }}>
                  {sessionStats.correct}
                </span>
                <span className="complete-stat-label">Correct</span>
              </div>
              <div className="complete-stat">
                <span className="complete-stat-value" style={{ color: 'var(--error)' }}>
                  {sessionStats.incorrect}
                </span>
                <span className="complete-stat-label">Wrong</span>
              </div>
              <div className="complete-stat">
                <span className="complete-stat-value">{accuracy}%</span>
                <span className="complete-stat-label">Accuracy</span>
              </div>
            </div>
            
            <div className="complete-actions">
              <button className="btn btn-primary btn-lg" onClick={() => setQuizMode(null)}>
                Try Again
              </button>
            </div>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  // Mode selection screen
  if (!quizMode) {
    return (
      <div className="page">
        <div className="container">
          <div className="page-header text-center">
            <h1 className="page-title">Quiz Mode</h1>
            <p className="page-subtitle">Test your hiragana knowledge</p>
          </div>

          <div className="mode-selection animate-fade-in">
            <button className="mode-card" onClick={() => startQuiz('reading')}>
              <div className="mode-icon jp">あ</div>
              <div className="mode-arrow">→</div>
              <div className="mode-icon">a</div>
              <div className="mode-info">
                <h3>Reading Mode</h3>
                <p>See hiragana, pick the romaji</p>
              </div>
            </button>
            
            <button className="mode-card" onClick={() => startQuiz('recognition')}>
              <div className="mode-icon">ka</div>
              <div className="mode-arrow">→</div>
              <div className="mode-icon jp">か</div>
              <div className="mode-info">
                <h3>Recognition Mode</h3>
                <p>See romaji, pick the hiragana</p>
              </div>
            </button>
          </div>

          <div className="quiz-info">
            <p>📝 20 questions per quiz</p>
            <p>🎯 All 109 hiragana characters</p>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="page">
      <div className="container">
        <div className="quiz-header">
          <div className="quiz-meta">
            <span className="quiz-progress">{currentIndex + 1} / {questions.length}</span>
            {streak > 1 && <span className="quiz-streak">🔥 {streak}</span>}
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="quiz-question animate-fade-in">
          <div className={`question-display ${currentQuestion?.displayType === 'hiragana' ? 'jp' : ''}`}>
            {currentQuestion?.display}
          </div>
          <p className="question-prompt">
            {quizMode === 'reading' ? 'What is the romaji?' : 'Which hiragana is this?'}
          </p>
        </div>

        <div className="quiz-options">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${currentQuestion?.displayType === 'hiragana' ? '' : 'jp'} 
                ${showResult && option.correct ? 'correct' : ''}
                ${showResult && selectedAnswer === option && !option.correct ? 'incorrect' : ''}
                ${showResult && selectedAnswer !== option ? 'disabled' : ''}`}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
            >
              <span className="option-key">{index + 1}</span>
              {option.value}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="quiz-feedback animate-fade-in">
            {selectedAnswer?.correct ? (
              <div className="feedback-correct">
                <span className="feedback-icon">✓</span>
                <span>Correct!</span>
              </div>
            ) : (
              <div className="feedback-incorrect">
                <span className="feedback-icon">✗</span>
                <span>The answer was {currentQuestion?.options.find(o => o.correct)?.value}</span>
              </div>
            )}
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .quiz-header {
    max-width: 500px;
    margin: 0 auto 2rem;
  }

  .quiz-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .quiz-progress {
    color: var(--text-muted);
    font-size: 0.875rem;
  }

  .quiz-streak {
    font-size: 1rem;
    font-weight: 600;
    color: var(--warning);
    animation: pulse 0.5s ease;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  .quiz-question {
    text-align: center;
    margin-bottom: 2rem;
  }

  .question-display {
    font-size: 5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .question-display.jp {
    font-family: var(--font-jp);
    font-size: 6rem;
  }

  .question-prompt {
    color: var(--text-muted);
  }

  .quiz-options {
    max-width: 400px;
    margin: 0 auto;
  }

  .quiz-option.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .option-key {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 0.625rem;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
  }

  .quiz-option {
    position: relative;
  }

  .quiz-feedback {
    text-align: center;
    margin-top: 2rem;
  }

  .feedback-correct, .feedback-incorrect {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .feedback-correct {
    color: var(--success);
  }

  .feedback-incorrect {
    color: var(--error);
  }

  .feedback-icon {
    font-size: 1.5rem;
  }

  .mode-selection {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto 2rem;
  }

  .mode-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: left;
  }

  .mode-card:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--shadow);
  }

  .mode-icon {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary);
    min-width: 60px;
    text-align: center;
  }

  .mode-icon.jp {
    font-family: var(--font-jp);
    font-size: 2.5rem;
  }

  .mode-arrow {
    font-size: 1.5rem;
    color: var(--text-muted);
  }

  .mode-info h3 {
    margin-bottom: 0.25rem;
  }

  .mode-info p {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .quiz-info {
    text-align: center;
    color: var(--text-muted);
  }

  .quiz-info p {
    margin: 0.5rem 0;
  }

  .quiz-complete {
    text-align: center;
    padding: 3rem 1rem;
  }

  .complete-grade {
    font-size: 5rem;
    font-weight: 800;
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
    .question-display {
      font-size: 4rem;
    }

    .question-display.jp {
      font-size: 5rem;
    }

    .mode-card {
      flex-wrap: wrap;
      justify-content: center;
    }

    .mode-info {
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
    }

    .complete-stats {
      gap: 1.5rem;
    }

    .complete-stat-value {
      font-size: 2rem;
    }
  }
`;
