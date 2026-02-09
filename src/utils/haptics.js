/**
 * Haptic feedback utility using Web Vibration API
 * Provides tactile feedback for mobile devices
 */

const supportsVibration = () => {
  return 'vibrate' in navigator;
};

/**
 * Vibration patterns for different feedback types
 */
export const VibrationPatterns = {
  CORRECT: [50], // Short single pulse
  INCORRECT: [100, 50, 100], // Double pulse
  SUCCESS: [50, 100, 50, 100, 50], // Celebration pattern
  WARNING: [200], // Longer single pulse
  TAP: [10], // Very short pulse
  LEVEL_UP: [50, 50, 50, 50, 100, 100, 50, 50], // Victory pattern
};

/**
 * Trigger haptic feedback with specified pattern
 * @param {string} type - Pattern type from VibrationPatterns
 * @param {boolean} enabled - Whether haptics are enabled in settings
 */
export const triggerHaptic = (type = 'TAP', enabled = true) => {
  if (!enabled || !supportsVibration()) {
    return false;
  }

  const pattern = VibrationPatterns[type] || VibrationPatterns.TAP;
  
  try {
    navigator.vibrate(pattern);
    return true;
  } catch (error) {
    console.warn('Vibration API failed:', error);
    return false;
  }
};

/**
 * Stop any ongoing vibration
 */
export const stopHaptic = () => {
  if (supportsVibration()) {
    navigator.vibrate(0);
  }
};

/**
 * Check if device supports haptic feedback
 */
export const hasHapticSupport = supportsVibration;
