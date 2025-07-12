'use client'
import React, { useEffect, useState } from 'react';

const unicornImages = [
  '/unicorns/unicorn1.png',
  '/unicorns/unicorn2.png',
  '/unicorns/unicorn3.png',
  '/unicorns/unicorn4.png',
  '/unicorns/unicorn5.png',
  '/unicorns/unicorn6.png',
  '/unicorns/unicorn7.png',
];

type Jumper = { id: string; img: string; side: string };
// For jumping unicorns
const getRandomUnicorn = () => unicornImages[Math.floor(Math.random() * unicornImages.length)];
const getRandomSide = () => (Math.random() > 0.5 ? 'left' : 'right');

const Unicorns = () => {
  type Jumper = { id: string; img: string; side: string };
  const [jumpers, setJumpers] = useState<Jumper[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setJumpers(jumpers => [
        ...jumpers,
        {
          id: Math.random().toString(36).slice(2),
          img: getRandomUnicorn(),
          side: getRandomSide(),
        },
      ]);
    }, 2500); // New jumper every 2.5s
    return () => clearInterval(interval);
  }, []);

  // Remove unicorn after animation
  useEffect(() => {
    if (jumpers.length === 0) return;
    const timeout = setTimeout(() => {
      setJumpers(jumpers => jumpers.slice(1));
    }, 2200);
    return () => clearTimeout(timeout);
  }, [jumpers]);

  return (
    <>
      {/* Row of unicorns at the base */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 10,
        pointerEvents: 'none',
        gap: '1.5vw',
        paddingBottom: '8px',
      }}>
        {unicornImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`unicorn${i+1}`}
            style={{ height: '60px', width: 'auto', filter: 'drop-shadow(0 2px 8px #fff8)' }}
            draggable={false}
          />
        ))}
      </div>
      {/* Jumping unicorns */}
      {jumpers.map(jumper => (
        <img
          key={jumper.id}
          src={jumper.img}
          alt="jumping unicorn"
          className={`unicorn-jumper ${jumper.side}`}
          style={{
            position: 'fixed',
            bottom: 0,
            [jumper.side]: 0,
            height: '70px',
            width: 'auto',
            zIndex: 20,
            pointerEvents: 'none',
            animation: `unicorn-jump-${jumper.side} 2s cubic-bezier(.4,1.6,.6,1)`,
          }}
        />
      ))}
      <style>{`
        @keyframes unicorn-jump-left {
          0% { left: 0; bottom: 0; opacity: 0; }
          1% { opacity: 0; }
          4% { opacity: 0; }
          5% { opacity: 0; }
          10% { opacity: 1; }
          40% { left: 20vw; bottom: 30vh; }
          60% { left: 30vw; bottom: 40vh; }
          80% { left: 40vw; bottom: 10vh; opacity: 1; }
          95% { opacity: 0; }
          96% { opacity: 0; }
          99% { opacity: 0; }
          100% { left: 0; bottom: 0; opacity: 0; }
        }
        @keyframes unicorn-jump-right {
          0% { right: 0; bottom: 0; opacity: 0; }
          1% { opacity: 0; }
          4% { opacity: 0; }
          5% { opacity: 0; }
          10% { opacity: 1; }
          40% { right: 20vw; bottom: 30vh; }
          60% { right: 30vw; bottom: 40vh; }
          80% { right: 40vw; bottom: 10vh; opacity: 1; }
          95% { opacity: 0; }
          96% { opacity: 0; }
          99% { opacity: 0; }
          100% { right: 0; bottom: 0; opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default Unicorns; 