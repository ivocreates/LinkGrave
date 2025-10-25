import { useEffect, useState } from 'react';
import './CursorTrail.css';

function CursorTrail() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e) => {
      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
        emoji: ['💀', '👻', '🕷️', '🦇'][Math.floor(Math.random() * 4)]
      };

      setTrails(prev => [...prev, newTrail]);

      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-trail-container">
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y
          }}
        >
          {trail.emoji}
        </div>
      ))}
    </div>
  );
}

export default CursorTrail;
