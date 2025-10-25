import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './FloatingGhosts.css';

function FloatingGhosts() {
  const [ghosts, setGhosts] = useState([]);

  useEffect(() => {
    const generateGhosts = () => {
      const ghostArray = [];
      for (let i = 0; i < 5; i++) {
        ghostArray.push({
          id: i,
          emoji: ['👻', '🦇', '🕷️', '💀', '🕸️'][i],
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 15 + Math.random() * 10
        });
      }
      setGhosts(ghostArray);
    };

    generateGhosts();
  }, []);

  return (
    <div className="floating-ghosts">
      {ghosts.map(ghost => (
        <motion.div
          key={ghost.id}
          className="floating-ghost"
          style={{ left: `${ghost.x}%` }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: ghost.duration,
            repeat: Infinity,
            delay: ghost.delay,
            ease: 'easeInOut'
          }}
        >
          {ghost.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingGhosts;
