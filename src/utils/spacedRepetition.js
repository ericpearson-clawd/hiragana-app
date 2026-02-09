// Spaced Repetition System (SRS) Implementation
// Based on research intervals: 1d→3d→7d→14d→30d

/**
 * SRS Levels and Intervals
 * - Level 0: New (not yet learned)
 * - Level 1: 4 hours
 * - Level 2: 8 hours
 * - Level 3: 1 day
 * - Level 4: 3 days
 * - Level 5: 7 days
 * - Level 6: 14 days
 * - Level 7: 30 days
 * - Level 8: 90 days (burned)
 */

const SRS_INTERVALS = {
  0: 0,           // New - show immediately
  1: 4 * 60 * 60 * 1000,      // 4 hours
  2: 8 * 60 * 60 * 1000,      // 8 hours
  3: 24 * 60 * 60 * 1000,     // 1 day
  4: 3 * 24 * 60 * 60 * 1000, // 3 days
  5: 7 * 24 * 60 * 60 * 1000, // 7 days
  6: 14 * 24 * 60 * 60 * 1000, // 14 days
  7: 30 * 24 * 60 * 60 * 1000, // 30 days
  8: 90 * 24 * 60 * 60 * 1000, // 90 days (burned)
};

const SRS_LEVEL_NAMES = {
  0: 'New',
  1: 'Apprentice I',
  2: 'Apprentice II',
  3: 'Apprentice III',
  4: 'Apprentice IV',
  5: 'Guru I',
  6: 'Guru II',
  7: 'Master',
  8: 'Enlightened',
};

/**
 * Calculate when a character should be reviewed next
 * @param {number} currentLevel - Current SRS level (0-8)
 * @param {boolean} correct - Whether the answer was correct
 * @param {number} lastReview - Timestamp of last review
 * @returns {object} - { newLevel, nextReview }
 */
export function calculateNextReview(currentLevel, correct, lastReview = Date.now()) {
  let newLevel;
  
  if (correct) {
    // Move up one level
    newLevel = Math.min(currentLevel + 1, 8);
  } else {
    // Drop back to Apprentice I if wrong
    newLevel = Math.max(1, Math.floor(currentLevel / 2));
  }
  
  const interval = SRS_INTERVALS[newLevel];
  const nextReview = lastReview + interval;
  
  return {
    newLevel,
    nextReview,
    interval,
    levelName: SRS_LEVEL_NAMES[newLevel],
  };
}

/**
 * Get all characters due for review
 * @param {object} characters - Character progress data
 * @returns {array} - Characters due for review
 */
export function getDueReviews(characters) {
  const now = Date.now();
  
  return Object.entries(characters)
    .filter(([char, data]) => {
      // Include characters that have a nextReview time set and it's in the past
      return data.nextReview && data.nextReview <= now;
    })
    .map(([char, data]) => ({
      char,
      ...data,
    }))
    .sort((a, b) => a.nextReview - b.nextReview); // Oldest reviews first
}

/**
 * Get upcoming review schedule
 * @param {object} characters - Character progress data
 * @returns {object} - Review counts by time period
 */
export function getReviewSchedule(characters) {
  const now = Date.now();
  const schedule = {
    available: 0,
    next1Hour: 0,
    next4Hours: 0,
    next24Hours: 0,
    nextWeek: 0,
    later: 0,
  };
  
  Object.values(characters).forEach(data => {
    if (!data.nextReview) return;
    
    const timeUntil = data.nextReview - now;
    
    if (timeUntil <= 0) {
      schedule.available++;
    } else if (timeUntil <= 60 * 60 * 1000) {
      schedule.next1Hour++;
    } else if (timeUntil <= 4 * 60 * 60 * 1000) {
      schedule.next4Hours++;
    } else if (timeUntil <= 24 * 60 * 60 * 1000) {
      schedule.next24Hours++;
    } else if (timeUntil <= 7 * 24 * 60 * 60 * 1000) {
      schedule.nextWeek++;
    } else {
      schedule.later++;
    }
  });
  
  return schedule;
}

/**
 * Format time until next review
 * @param {number} timestamp - Future timestamp
 * @returns {string} - Human-readable time
 */
export function formatTimeUntil(timestamp) {
  const now = Date.now();
  const diff = timestamp - now;
  
  if (diff <= 0) return 'Available now';
  
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''}`;
  return 'Less than 1 min';
}

/**
 * Get SRS level color for visual indication
 * @param {number} level - SRS level (0-8)
 * @returns {string} - Color code
 */
export function getSRSLevelColor(level) {
  if (level === 0) return '#94A3B8'; // Gray - New
  if (level <= 4) return '#F59E0B'; // Amber - Apprentice
  if (level <= 6) return '#3B82F6'; // Blue - Guru
  if (level === 7) return '#A855F7'; // Purple - Master
  return '#10B981'; // Green - Enlightened
}

/**
 * Get weak characters (low SRS level or recent errors)
 * @param {object} characters - Character progress data
 * @param {number} threshold - SRS level threshold (default 4)
 * @returns {array} - Weak characters
 */
export function getWeakCharacters(characters, threshold = 4) {
  return Object.entries(characters)
    .filter(([char, data]) => {
      // Characters below threshold level
      if ((data.srsLevel || 0) < threshold) return true;
      
      // Characters with recent errors (>30% error rate)
      const total = (data.correct || 0) + (data.incorrect || 0);
      if (total > 5 && (data.incorrect / total) > 0.3) return true;
      
      return false;
    })
    .map(([char, data]) => ({
      char,
      srsLevel: data.srsLevel || 0,
      accuracy: total > 0 ? (data.correct / total) * 100 : 0,
      ...data,
    }))
    .sort((a, b) => a.srsLevel - b.srsLevel);
}

/**
 * Initialize character in SRS system
 * @param {string} char - Character to initialize
 * @returns {object} - Initial SRS data
 */
export function initializeSRS(char) {
  return {
    srsLevel: 0,
    nextReview: Date.now(), // Available immediately
    lastReview: null,
    correct: 0,
    incorrect: 0,
    reviewCount: 0,
  };
}
