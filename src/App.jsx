import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useProgress } from './hooks/useProgress';
import { useAchievements } from './hooks/useAchievements';
import AchievementUnlocked from './components/AchievementUnlocked';
import ErrorBoundary from './components/ErrorBoundary';
import SkeletonLoader from './components/SkeletonLoader';
import './index.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Progress = lazy(() => import('./pages/Progress'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Settings = lazy(() => import('./pages/Settings'));

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
    <ErrorBoundary>
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
          <main className="main-content" id="main-content">
            <Suspense fallback={
              <div style={{ padding: '2rem' }}>
                <SkeletonLoader variant="title" width="40%" />
                <SkeletonLoader variant="card" count={2} />
              </div>
            }>
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
            </Suspense>
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
    </ErrorBoundary>
  );
}

export default App;
