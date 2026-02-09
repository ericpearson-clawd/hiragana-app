// Audio pronunciation utilities using Web Speech API

class HiraganaAudio {
  constructor() {
    this.synth = window.speechSynthesis;
    this.japaneseVoice = null;
    this.initialized = false;
    this.fallbackAudio = new Map(); // For pre-recorded audio files if needed
  }

  // Initialize and find Japanese voice
  async init() {
    if (this.initialized) return;
    
    return new Promise((resolve) => {
      // Voices might not be loaded immediately
      const loadVoices = () => {
        const voices = this.synth.getVoices();
        
        // Try to find the best Japanese voice
        this.japaneseVoice = voices.find(voice => 
          voice.lang.startsWith('ja') && voice.name.includes('Google')
        ) || voices.find(voice => 
          voice.lang.startsWith('ja')
        );
        
        if (this.japaneseVoice || voices.length > 0) {
          this.initialized = true;
          console.log('🔊 Audio initialized with voice:', this.japaneseVoice?.name || 'default');
          resolve();
        }
      };

      loadVoices();
      
      // Some browsers need this event
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
      
      // Fallback after 1 second
      setTimeout(() => {
        if (!this.initialized) {
          this.initialized = true;
          resolve();
        }
      }, 1000);
    });
  }

  // Play pronunciation for a character
  async play(char, romaji, onStart, onEnd) {
    await this.init();
    
    // Stop any ongoing speech
    this.synth.cancel();
    
    try {
      // For Web Speech API, we use the romaji since Japanese voices
      // may not render hiragana characters well in all browsers
      const utterance = new SpeechSynthesisUtterance(romaji);
      
      // Configure for Japanese
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }
      
      // Add callbacks for visual feedback
      utterance.onstart = () => {
        if (onStart) onStart();
      };
      
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };
      
      // Play the audio
      this.synth.speak(utterance);
      
      return true;
    } catch (error) {
      console.error('Audio playback failed:', error);
      if (onEnd) onEnd();
      return false;
    }
  }

  // Stop any ongoing audio
  stop() {
    this.synth.cancel();
  }

  // Check if audio is supported
  isSupported() {
    return 'speechSynthesis' in window;
  }

  // Get available Japanese voices
  getJapaneseVoices() {
    const voices = this.synth.getVoices();
    return voices.filter(voice => voice.lang.startsWith('ja'));
  }
}

// Export singleton instance
export const hiraganaAudio = new HiraganaAudio();

// Utility function for easy use in components
export const playHiragana = (char, romaji, onStart, onEnd) => {
  return hiraganaAudio.play(char, romaji, onStart, onEnd);
};

export const stopAudio = () => {
  hiraganaAudio.stop();
};

export const isAudioSupported = () => {
  return hiraganaAudio.isSupported();
};
