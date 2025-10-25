import { motion } from 'framer-motion';
import './SecretGraveyard.css';

function SecretGraveyard({ onClose }) {
  return (
    <motion.div
      className="secret-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="secret-content"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: 'spring', stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="secret-title">🎮 You Found the Secret! 🎮</h2>
        
        <div className="secret-message">
          <p className="congrats">Congratulations, Code Necromancer!</p>
          <p>You've discovered the hidden graveyard by entering the legendary Konami Code!</p>
        </div>

        <div className="secret-code">
          <div className="code-display">
            ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A
          </div>
          <p className="code-label">The Ancient Ritual</p>
        </div>

        <div className="secret-rewards">
          <h3>Your Rewards:</h3>
          <ul>
            <li>💀 Eternal bragging rights</li>
            <li>👻 Ghost mode unlocked (just kidding)</li>
            <li>🕷️ Spider sense tingling</li>
            <li>⚰️ Coffin dance privileges</li>
            <li>🦇 Bat signal activated</li>
          </ul>
        </div>

        <div className="easter-egg-gallery">
          <div className="egg">🥚</div>
          <div className="egg">🐣</div>
          <div className="egg">🐥</div>
        </div>

        <motion.button
          className="close-secret-btn"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Return to the Living 👋
        </motion.button>

        <p className="secret-hint">
          Psst... Try clicking the spider in the footer 6 times 🕷️
        </p>
      </motion.div>
    </motion.div>
  );
}

export default SecretGraveyard;
