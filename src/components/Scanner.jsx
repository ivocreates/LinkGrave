import { useState } from 'react';
import { motion } from 'framer-motion';
import './Scanner.css';

const spookyMessages = [
  "Awakening the spirits... 👻",
  "Crawling through the shadows... 🕷️",
  "Summoning the dead links... 💀",
  "Haunting your website... 🦇",
  "Digging through the graveyard... ⚰️",
  "Conjuring the broken souls... 🔮",
  "Searching the dark corners... 🌙",
  "Communicating with the void... 🕳️",
  "Following the web of death... 🕸️",
  "Chasing phantom pages... 👻"
];

function Scanner({ onScan, isScanning }) {
  const [url, setUrl] = useState('');
  const [deepScan, setDeepScan] = useState(false);
  const [checkExternal, setCheckExternal] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [linksChecked, setLinksChecked] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    onScan(normalizedUrl, { deepScan, checkExternal });

    // Simulate progress
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 100) {
        clearInterval(interval);
        return;
      }
      count += Math.random() * 10;
      setProgress(Math.min(count, 100));
      setLinksChecked(Math.floor(count / 2));
      
      if (count % 15 === 0) {
        setMessage(spookyMessages[Math.floor(Math.random() * spookyMessages.length)]);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {!isScanning ? (
        <motion.div className="scanner-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <motion.input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a website URL to haunt..."
                className="url-input"
                whileFocus={{ scale: 1.02 }}
                required
              />
              
              <motion.button
                type="submit"
                className="scan-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isScanning}
              >
                <span className="button-text">Summon the Crawler</span>
                <motion.span 
                  className="skull-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💀
                </motion.span>
              </motion.button>
            </div>

            <div className="options">
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={deepScan}
                  onChange={(e) => setDeepScan(e.target.checked)}
                  className="checkbox"
                />
                <span>🕳️ Deep Haunt (scan multiple pages)</span>
              </label>

              <label className="option-label">
                <input
                  type="checkbox"
                  checked={checkExternal}
                  onChange={(e) => setCheckExternal(e.target.checked)}
                  className="checkbox"
                />
                <span>🌐 Check external links</span>
              </label>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          className="scanning-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className="ghost-animation"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            👻
          </motion.div>

          <motion.p 
            className="scanning-message"
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>

          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="links-count">
            Links checked: <span className="count-number">{linksChecked}</span>
          </p>

          <div className="scanning-effects">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ⚰️
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            >
              🕷️
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
            >
              💀
            </motion.span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Scanner;
