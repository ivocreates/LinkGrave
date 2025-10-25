import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Scanner from './components/Scanner';
import Results from './components/Results';
import FloatingGhosts from './components/FloatingGhosts';
import JumpScare from './components/JumpScare';
import SecretGraveyard from './components/SecretGraveyard';
import CursorTrail from './components/CursorTrail';
import { scanWebsite } from './utils/linkChecker';
import './App.css';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [showJumpScare, setShowJumpScare] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [konami, setKonami] = useState([]);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const audioRef = useRef(null);

  // Konami code: up, up, down, down, left, right, left, right, b, a
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.key];
      setKonami(newKonami.slice(-10));

      if (newKonami.slice(-10).join(',') === konamiCode.join(',')) {
        setShowSecret(true);
        playSpookySound();
        setKonami([]);
      }
    };

    // Random jump scare
    const jumpScareTimer = setTimeout(() => {
      if (Math.random() < 0.3 && !isScanning) {
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), 2000);
      }
    }, Math.random() * 60000 + 30000);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(jumpScareTimer);
    };
  }, [konami, isScanning]);

  const playSpookySound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleScan = async (url, options) => {
    setIsScanning(true);
    setResults(null);
    playSpookySound();

    try {
      const scanResults = await scanWebsite(url, options);
      setResults(scanResults);
      
      // Chance of jump scare after scan
      if (scanResults.deadLinks.length > 10 && Math.random() < 0.5) {
        setTimeout(() => {
          setShowJumpScare(true);
          setTimeout(() => setShowJumpScare(false), 1500);
        }, 1000);
      }
    } catch (error) {
      console.error('Scan failed:', error);
      alert('The spirits are uncooperative... Try again! 👻');
    } finally {
      setIsScanning(false);
    }
  };

  const handleEasterEggClick = () => {
    setEasterEggCount(prev => prev + 1);
    if (easterEggCount >= 5) {
      setShowJumpScare(true);
      setTimeout(() => setShowJumpScare(false), 2000);
      setEasterEggCount(0);
    }
  };

  return (
    <div className="app">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBiud2PLZ" loop />
      
      <CursorTrail />
      <FloatingGhosts />
      
      <AnimatePresence>
        {showJumpScare && <JumpScare />}
      </AnimatePresence>

      <AnimatePresence>
        {showSecret && <SecretGraveyard onClose={() => setShowSecret(false)} />}
      </AnimatePresence>

      <div className="fog-container">
        <div className="fog fog-1"></div>
        <div className="fog fog-2"></div>
        <div className="fog fog-3"></div>
      </div>

      <div className="container">
        <Header onEasterEgg={handleEasterEggClick} />
        
        {!results ? (
          <Scanner onScan={handleScan} isScanning={isScanning} />
        ) : (
          <Results results={results} onNewScan={() => setResults(null)} />
        )}

        <footer className="footer">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Built with dark magic and React ✨
          </motion.p>
          <p className="secret-hint" onClick={handleEasterEggClick}>
            🕷️ {easterEggCount > 0 ? `${easterEggCount}/6` : 'Click the spider...'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
