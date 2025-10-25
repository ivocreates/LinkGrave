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

function Scanner({ onScan, isScanning, scanProgress, liveResults }) {
  const [url, setUrl] = useState('');
  const [deepScan, setDeepScan] = useState(false);
  const [checkExternal, setCheckExternal] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    onScan(normalizedUrl, { deepScan, checkExternal });
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
            key={scanProgress?.message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {scanProgress?.message || 'Awakening the spirits...'}
          </motion.p>

          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress?.progress || 0}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {scanProgress?.stage === 'extracting' && (
            <p className="links-count">
              Pages scanned: <span className="count-number">{scanProgress.currentPage ? '...' : '0'}</span>
            </p>
          )}

          {scanProgress?.stage === 'checking' && (
            <p className="links-count">
              Links checked: <span className="count-number">{scanProgress.checked || 0}</span> / {scanProgress.total || 0}
            </p>
          )}

          {/* Live dead links feed */}
          {liveResults && liveResults.length > 0 && (
            <motion.div 
              className="live-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="live-title">💀 Dead Links Found:</h4>
              <div className="live-list">
                {liveResults.slice(-5).map((result, index) => (
                  <motion.div
                    key={index}
                    className="live-item"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="live-status">{result.statusCode || '❌'}</span>
                    <span className="live-url">{result.url.substring(0, 50)}...</span>
                  </motion.div>
                ))}
              </div>
              {liveResults.length > 5 && (
                <p className="live-more">and {liveResults.length - 5} more...</p>
              )}
            </motion.div>
          )}

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
