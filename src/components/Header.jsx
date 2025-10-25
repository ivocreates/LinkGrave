import { motion } from 'framer-motion';
import './Header.css';

function Header({ onEasterEgg }) {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="title glitch" 
        data-text="LinkGrave"
        whileHover={{ scale: 1.05 }}
        onClick={onEasterEgg}
      >
        LinkGrave
      </motion.h1>
      
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Where Dead Links Go to Rest 💀
      </motion.p>
      
      <motion.p 
        className="tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        I crawl the web... and find what's been <span className="buried">buried</span>.
      </motion.p>

      <motion.div 
        className="blood-drip"
        initial={{ height: 0 }}
        animate={{ height: '50px' }}
        transition={{ delay: 1, duration: 2 }}
      />
    </motion.header>
  );
}

export default Header;
