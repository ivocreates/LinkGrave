import { motion } from 'framer-motion';
import './JumpScare.css';

const scaryFaces = ['👹', '😱', '💀', '👺', '🧟', '🧛'];

function JumpScare() {
  const randomFace = scaryFaces[Math.floor(Math.random() * scaryFaces.length)];

  return (
    <motion.div
      className="jumpscare-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="jumpscare-face"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [0, 1.5, 1.2],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {randomFace}
      </motion.div>
      <motion.div
        className="jumpscare-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        BOO! 👻
      </motion.div>
    </motion.div>
  );
}

export default JumpScare;
