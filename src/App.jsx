import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { useProgress } from './hooks/useProgress';
import './index.css';

function App() {
  const {
    progress,
    updateStreak,
    recordAttempt,
    getMastery,
    getOverallMastery,
    getWeakCharacters,
    getUnpracticedCount,
    toggleDarkMode,
    resetProgress,
  } = useProgress();

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      progress.settings.darkMode ? 'dark' : 'light'
    );
  }, [progress.settings.darkMode]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header 
          darkMode={progress.settings.darkMode} 
          onToggleTheme={toggleDarkMode}
        />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  progress={progress}
                  getOverallMastery={getOverallMastery}
                  getUnpracticedCount={getUnpracticedCount}
                />
              } 
            />
            <Route 
              path="/flashcards" 
              element={
                <Flashcards 
                  recordAttempt={recordAttempt}
                  updateStreak={updateStreak}
                  getMastery={getMastery}
                />
              } 
            />
            <Route 
              path="/quiz" 
              element={
                <Quiz 
                  recordAttempt={recordAttempt}
                  updateStreak={updateStreak}
                />
              } 
            />
            <Route 
              path="/progress" 
              element={
                <Progress 
                  progress={progress}
                  getMastery={getMastery}
                  getOverallMastery={getOverallMastery}
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  progress={progress}
                  toggleDarkMode={toggleDarkMode}
                  resetProgress={resetProgress}
                />
              } 
            />
          </Routes>
        </main>
      </div>

      <style>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding-bottom: 80px;
        }

        @media (min-width: 769px) {
          .main-content {
            padding-bottom: 2rem;
          }
        }
      `}</style>
    </BrowserRouter>
  );
}

export default App;
