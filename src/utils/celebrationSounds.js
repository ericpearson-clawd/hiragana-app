// Success chimes using Web Audio API
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create a pleasant 3-note ascending chord
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      // Stagger notes slightly
      const startTime = now + (index * 0.08);
      const endTime = startTime + 0.3;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  } catch (error) {
    console.warn('Could not play success chime:', error);
  }
}

export function playPerfectChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Triumphant 4-note fanfare
    const notes = [
      { freq: 523.25, time: 0 },     // C5
      { freq: 659.25, time: 0.1 },   // E5
      { freq: 783.99, time: 0.2 },   // G5
      { freq: 1046.5, time: 0.3 }    // C6
    ];
    
    notes.forEach(note => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = 'triangle';
      
      const startTime = now + note.time;
      const endTime = startTime + 0.4;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  } catch (error) {
    console.warn('Could not play perfect chime:', error);
  }
}
