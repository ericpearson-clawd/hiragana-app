import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import { useProgress } from './hooks/useProgress';
import { useAchievements } from './hooks/useAchievements';
import AchievementUnlocked from './components/AchievementUnlocked';
import './index.css';

function App() {
  const {
    progress,
    updateStreak,
    recordAttempt,
    recordPerfectSession,
    getMastery,
    getOverallMastery,
    getWeakCharacters,
    getUnpracticedCount,
    toggleDarkMode,
    toggleAutoPlayAudio,
    toggleReviewNotifications,
    resetProgress,
  } = useProgress();

  const {
    newlyUnlocked,
    dismissNewAchievement,
    getUnlockedCount,
    getTotalCount,
  } = useAchievements(progress, getMastery);

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
          streak={progress.streak}
          longestStreak={progress.longestStreak}
          achievementsUnlocked={getUnlockedCount()}
          achievementsTotal={getTotalCount()}
        />
        <AchievementUnlocked 
          achievement={newlyUnlocked}
          onDismiss={dismissNewAchievement}
        />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  progress={progress}
                  getMastery={getMastery}
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
                  recordPerfectSession={recordPerfectSession}
                  updateStreak={updateStreak}
                  getMastery={getMastery}
                  getWeakCharacters={getWeakCharacters}
                  autoPlayAudio={progress.settings.autoPlayAudio}
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
              path="/achievements" 
              element={<Achievements />} 
            />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  progress={progress}
                  toggleDarkMode={toggleDarkMode}
                  toggleAutoPlayAudio={toggleAutoPlayAudio}
                  toggleReviewNotifications={toggleReviewNotifications}
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
