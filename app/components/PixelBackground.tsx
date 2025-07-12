import React from 'react';

const emojiHearts = [
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🩷', '🩵', '🩶'
];

// Generate 60 heart positions, avoiding the central area (25%-75% vertical, 20%-80% horizontal)
const heartPositions = Array.from({ length: 30 }, (_, i) => {
  // Pick edge zones: top, bottom, left, or right
  let top, left;
  const edge = Math.floor(Math.random() * 4);
  if (edge === 0) { // top edge
    top = `${Math.floor(Math.random() * 18) + 2}%`;
    left = `${Math.floor(Math.random() * 96) + 2}%`;
  } else if (edge === 1) { // bottom edge
    top = `${Math.floor(Math.random() * 18) + 80}%`;
    left = `${Math.floor(Math.random() * 96) + 2}%`;
  } else if (edge === 2) { // left edge
    top = `${Math.floor(Math.random() * 96) + 2}%`;
    left = `${Math.floor(Math.random() * 16) + 2}%`;
  } else { // right edge
    top = `${Math.floor(Math.random() * 96) + 2}%`;
    left = `${Math.floor(Math.random() * 16) + 82}%`;
  }
  // Randomize size between 22 and 44px
  const size = Math.floor(Math.random() * 22) + 22;
  // Cycle through emojis
  const emoji = emojiHearts[i % emojiHearts.length];
  // Staggered animation delays
  const delay = `${(i % 10) * 0.4 + Math.random() * 0.3}s`;
  return { top, left, size, emoji, delay };
});

// 8-bit pixel cloud SVG (unchanged)
const PixelCloud = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="120" height="40" viewBox="0 0 24 8" style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="4" height="4" fill="#fff"/>
    <rect x="4" y="2" width="4" height="6" fill="#fff"/>
    <rect x="8" y="0" width="8" height="8" fill="#fff"/>
    <rect x="16" y="2" width="4" height="6" fill="#fff"/>
    <rect x="20" y="4" width="4" height="4" fill="#fff"/>
  </svg>
);

const PixelBackground = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
    {/* Clouds at the top */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', zIndex: 1 }}>
      <PixelCloud style={{ marginLeft: 24, marginTop: 8, opacity: 0.9 }} />
      <PixelCloud style={{ marginRight: 24, marginTop: 16, opacity: 0.8, transform: 'scaleX(-1)' }} />
      <PixelCloud style={{ marginRight: 80, marginTop: 0, opacity: 0.7 }} />
    </div>
    {/* Floating emoji hearts around the edges only */}
    {heartPositions.map((h, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          top: h.top,
          left: h.left,
          fontSize: h.size,
          zIndex: 2,
          animation: `floatHeart 6s ease-in-out infinite`,
          animationDelay: h.delay,
          filter: 'drop-shadow(0 0 4px #fff8) drop-shadow(0 0 8px #fff4)',
          userSelect: 'none',
        }}
      >
        {h.emoji}
      </span>
    ))}
    <style>{`
      @keyframes floatHeart {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        50% { transform: translateY(-30px) scale(1.1); opacity: 0.8; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

export default PixelBackground; 