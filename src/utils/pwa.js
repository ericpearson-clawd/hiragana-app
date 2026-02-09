/**
 * PWA utilities for service worker registration and install prompts
 */

let deferredPrompt = null;

/**
 * Register service worker for offline support
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });
    });
  }
};

/**
 * Handle beforeinstallprompt event to show custom install UI
 */
export const initInstallPrompt = (onPromptReady) => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    if (onPromptReady) {
      onPromptReady(e);
    }
  });

  // Track successful install
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    deferredPrompt = null;
  });
};

/**
 * Show the install prompt
 * @returns {Promise<boolean>} True if user accepted
 */
export const showInstallPrompt = async () => {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  deferredPrompt = null;
  return outcome === 'accepted';
};

/**
 * Check if app is running as installed PWA
 */
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

/**
 * Check if install prompt is available
 */
export const canInstall = () => {
  return deferredPrompt !== null;
};
