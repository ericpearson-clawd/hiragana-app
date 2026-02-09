import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hiragana-master-progress';

const initialProgress = {
  streak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  totalSessions: 0,
  perfectSessions: 0,
  characters: {},
  settings: {
    darkMode: false,
    soundEnabled: true,
    autoPlayAudio: false,
  }
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...initialProgress, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    return initialProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  // Update streak based on last practice date
  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setProgress(prev => {
      if (prev.lastPracticeDate === today) {
        return prev; // Already practiced today
      }
      
      let newStreak = prev.streak;
      if (prev.lastPracticeDate === yesterday) {
        newStreak = prev.streak + 1; // Continue streak
      } else if (prev.lastPracticeDate !== today) {
        newStreak = 1; // Reset streak
      }
      
      const newLongestStreak = Math.max(prev.longestStreak || 0, newStreak);
      
      return {
        ...prev,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastPracticeDate: today,
        totalSessions: prev.totalSessions + 1,
      };
    });
  }, []);

  // Record a character attempt
  const recordAttempt = useCallback((char, correct) => {
    setProgress(prev => {
      const charStats = prev.characters[char] || { correct: 0, incorrect: 0, lastSeen: null };
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char]: {
            correct: charStats.correct + (correct ? 1 : 0),
            incorrect: charStats.incorrect + (correct ? 0 : 1),
            lastSeen: Date.now(),
          }
        }
      };
    });
  }, []);

  // Record a perfect session (100% accuracy)
  const recordPerfectSession = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      perfectSessions: (prev.perfectSessions || 0) + 1,
    }));
  }, []);

  // Get mastery percentage for a character (0-100)
  const getMastery = useCallback((char) => {
    const stats = progress.characters[char];
    if (!stats) return 0;
    const total = stats.correct + stats.incorrect;
    if (total === 0) return 0;
    // Weight recent attempts more heavily
    const accuracy = stats.correct / total;
    // Require at least 5 attempts for full mastery
    const confidence = Math.min(total / 5, 1);
    return Math.round(accuracy * confidence * 100);
  }, [progress.characters]);

  // Get overall mastery percentage
  const getOverallMastery = useCallback(() => {
    const chars = Object.keys(progress.characters);
    if (chars.length === 0) return 0;
    const totalMastery = chars.reduce((sum, char) => sum + getMastery(char), 0);
    return Math.round(totalMastery / 109); // 109 total hiragana including yoon
  }, [progress.characters, getMastery]);

  // Get characters that need more practice (low mastery)
  const getWeakCharacters = useCallback((threshold = 50) => {
    return Object.entries(progress.characters)
      .filter(([char, stats]) => getMastery(char) < threshold)
      .map(([char]) => char);
  }, [progress.characters, getMastery]);

  // Get characters never practiced
  const getUnpracticedCount = useCallback(() => {
    return 109 - Object.keys(progress.characters).length;
  }, [progress.characters]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        darkMode: !prev.settings.darkMode,
      }
    }));
  }, []);

  // Toggle auto-play audio
  const toggleAutoPlayAudio = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        autoPlayAudio: !prev.settings.autoPlayAudio,
      }
    }));
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  return {
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
    resetProgress,
  };
}
