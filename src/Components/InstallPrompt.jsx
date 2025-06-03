import { useEffect, useState } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      setPlatform('safari');
      setIsSupported(false);
    } else if (userAgent.includes('firefox')) {
      setPlatform('firefox');
      setIsSupported(false);
    } else {
      setPlatform('chrome');
      setIsSupported(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to my App</h1>

      {isSupported && showPrompt && (
        <button
          onClick={handleInstallClick}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#FFFF00',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            animation: 'pulse 1.5s infinite',
            zIndex: 999
          }}
        >
          <img
            src="/icons/icon-192x192.png"
            alt="Install Icon"
            style={{ width: '24px', height: '24px' }}
          />
          Install App
        </button>
      )}

      {!isSupported && platform === 'safari' && (
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          To install this app on Safari, tap the <strong>Share</strong> icon and select <strong>“Add to Home Screen”</strong>.
        </p>
      )}

      {!isSupported && platform === 'firefox' && (
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          In Firefox, open the browser menu and click <strong>“Install”</strong> to add this app.
        </p>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default InstallPrompt;