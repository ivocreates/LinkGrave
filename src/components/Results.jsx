import { motion } from 'framer-motion';
import { useState } from 'react';
import './Results.css';

const deadMessages = [
  "This page... is no more. 💀",
  "Gone to the great beyond. ⚰️",
  "Resting in pieces. 🪦",
  "The spirits have claimed this one. 👻",
  "Lost in the void forever. 🕳️",
  "Deceased and departed. 💀",
  "Six feet under. ⚰️",
  "Eternally broken. 🦴",
  "Vanished into darkness. 🌑",
  "Cursed and forgotten. 🕯️"
];

function Results({ results, onNewScan }) {
  const [showHealthy, setShowHealthy] = useState(false);
  const [selectedDead, setSelectedDead] = useState(null);

  const exportReport = () => {
    const report = {
      scannedUrl: results.url,
      scannedAt: new Date().toISOString(),
      summary: {
        total: results.total,
        alive: results.healthyLinks.length,
        dead: results.deadLinks.length
      },
      deadLinks: results.deadLinks,
      healthyLinks: results.healthyLinks
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkgrave-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="results-container"
    >
      <motion.h2 
        className="results-title"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        The Graveyard Report 🪦
      </motion.h2>

      <div className="summary-grid">
        <motion.div 
          className="summary-card alive"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="card-icon">✅</div>
          <div className="card-info">
            <div className="card-number">{results.healthyLinks.length}</div>
            <div className="card-label">Living Links</div>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card dead"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        >
          <div className="card-icon">💀</div>
          <div className="card-info">
            <div className="card-number">{results.deadLinks.length}</div>
            <div className="card-label">Dead Links</div>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card total"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="card-icon">🕷️</div>
          <div className="card-info">
            <div className="card-number">{results.total}</div>
            <div className="card-label">Total Links</div>
          </div>
        </motion.div>
      </div>

      {results.deadLinks.length === 0 ? (
        <motion.div 
          className="no-dead-links"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="celebration">✨👻✨</div>
          <h3>All Clear!</h3>
          <p>No dead links found. Your website is haunted by living links only!</p>
        </motion.div>
      ) : (
        <div className="dead-links-section">
          <h3 className="section-title">
            <span className="skull-pile">💀💀💀</span> Buried Links <span className="skull-pile">💀💀💀</span>
          </h3>
          
          {results.deadLinks.map((link, index) => (
            <motion.div
              key={index}
              className="dead-link-card"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDead(selectedDead === index ? null : index)}
            >
              <div className="dead-link-header">
                <motion.span 
                  className="dead-skull"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                >
                  💀
                </motion.span>
                <span className="dead-message">
                  {deadMessages[index % deadMessages.length]}
                </span>
              </div>

              <div className="dead-link-url">{link.url}</div>

              <div className="dead-link-meta">
                <span className="meta-item">
                  <strong>Status:</strong> {link.statusCode || 'Unknown'}
                </span>
                <span className="meta-item">
                  <strong>Type:</strong> {link.isExternal ? 'External 🌐' : 'Internal 🏠'}
                </span>
              </div>

              {selectedDead === index && (
                <motion.div 
                  className="dead-link-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                >
                  <div className="detail-row">
                    <strong>Found on:</strong> <a href={link.foundOn} target="_blank" rel="noopener noreferrer">{link.foundOn}</a>
                  </div>
                  {link.error && (
                    <div className="detail-row error">
                      <strong>Error:</strong> {link.error}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {results.healthyLinks.length > 0 && (
        <div className="healthy-links-section">
          <motion.button
            className="toggle-button"
            onClick={() => setShowHealthy(!showHealthy)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHealthy ? 'Hide' : 'Show'} Living Links 👁️
          </motion.button>

          {showHealthy && (
            <motion.div 
              className="healthy-links-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
            >
              {results.healthyLinks.map((link, index) => (
                <motion.div
                  key={index}
                  className="healthy-link-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  ✅ {link.url}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      <div className="action-buttons">
        <motion.button
          className="export-button"
          onClick={exportReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Export Report 📋
        </motion.button>

        <motion.button
          className="new-scan-button"
          onClick={onNewScan}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Scan 🔄
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Results;
