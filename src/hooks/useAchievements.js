import { useState, useEffect, useCallback } from 'react';

const ACHIEVEMENTS = {
  FIRST_CHAR: {
    id: 'first_char',
    title: 'First Steps',
    description: 'Practiced your first character',
    icon: '🎯',
    check: (progress) => Object.keys(progress.characters).length >= 1,
  },
  FIRST_PERFECT: {
    id: 'first_perfect',
    title: 'Perfect!',
    description: 'Got your first character to 100% mastery',
    icon: '💯',
    check: (progress, getMastery) => {
      return Object.keys(progress.characters).some(char => getMastery(char) === 100);
    },
  },
  STREAK_7: {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    check: (progress) => progress.streak >= 7,
  },
  STREAK_30: {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintained a 30-day streak',
    icon: '🏆',
    check: (progress) => progress.streak >= 30,
  },
  HALF_BASIC: {
    id: 'half_basic',
    title: 'Halfway There',
    description: 'Mastered 23 basic hiragana',
    icon: '⭐',
    check: (progress, getMastery) => {
      const basicChars = Object.keys(progress.characters).filter(char => {
        // Basic hiragana are those not in dakuten, handakuten, or yoon groups
        return getMastery(char) >= 80;
      });
      return basicChars.length >= 23;
    },
  },
  ALL_BASIC: {
    id: 'all_basic',
    title: 'Basic Hiragana Master',
    description: 'Mastered all 46 basic hiragana',
    icon: '🌟',
    check: (progress, getMastery) => {
      const masteredChars = Object.keys(progress.characters).filter(char => 
        getMastery(char) >= 80
      );
      return masteredChars.length >= 46;
    },
  },
  CENTURY_CLUB: {
    id: 'century_club',
    title: 'Century Club',
    description: 'Completed 100 total practice sessions',
    icon: '💪',
    check: (progress) => progress.totalSessions >= 100,
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Completed a perfect session (100% accuracy)',
    icon: '⚡',
    check: (progress) => progress.perfectSessions && progress.perfectSessions >= 1,
  },
};

export function useAchievements(progress, getMastery) {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const stored = localStorage.getItem('hiragana-achievements');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);

  // Check for new achievements
  const checkAchievements = useCallback(() => {
    const allAchievements = Object.values(ACHIEVEMENTS);
    const newUnlocks = [];

    allAchievements.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id)) {
        if (achievement.check(progress, getMastery)) {
          newUnlocks.push(achievement.id);
        }
      }
    });

    if (newUnlocks.length > 0) {
      const updated = [...unlockedAchievements, ...newUnlocks];
      setUnlockedAchievements(updated);
      localStorage.setItem('hiragana-achievements', JSON.stringify(updated));
      
      // Show the first newly unlocked achievement
      const firstNew = allAchievements.find(a => a.id === newUnlocks[0]);
      setNewlyUnlocked(firstNew);
      
      // Auto-hide after 5 seconds
      setTimeout(() => setNewlyUnlocked(null), 5000);
    }
  }, [progress, getMastery, unlockedAchievements]);

  // Check on mount and when progress changes
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  const dismissNewAchievement = () => {
    setNewlyUnlocked(null);
  };

  const getUnlockedCount = () => unlockedAchievements.length;
  const getTotalCount = () => Object.keys(ACHIEVEMENTS).length;
  
  const getAllAchievements = () => {
    return Object.values(ACHIEVEMENTS).map(achievement => ({
      ...achievement,
      unlocked: unlockedAchievements.includes(achievement.id),
    }));
  };

  return {
    unlockedAchievements,
    newlyUnlocked,
    dismissNewAchievement,
    checkAchievements,
    getUnlockedCount,
    getTotalCount,
    getAllAchievements,
  };
}
