import { useEffect } from 'react';

const DOT_COUNT = 12;
const RADIUS    = 19; // dot-center radius within the 50×50 box

/* Dots circle spinner — 12 dots fading around the ring, whole group rotates */
function DotSpinner() {
  return (
    <svg
      width="50" height="50" viewBox="-25 -25 50 50"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        const angle   = (i / DOT_COUNT) * 2 * Math.PI;
        const x       = RADIUS * Math.cos(angle);
        const y       = RADIUS * Math.sin(angle);
        const opacity = 0.15 + 0.85 * (i / (DOT_COUNT - 1));
        return <circle key={i} cx={x} cy={y} r={3} fill="#183497" opacity={opacity} />;
      })}
    </svg>
  );
}

export default function LoadingScreen({ onDone, text = 'בונה את לוח האירועים..' }) {
  /* Auto-advance after 2 seconds */
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8F5EE',
      gap: 16,
    }}>

      <DotSpinner />

      <p style={{
        fontFamily: 'Atlas',
        fontWeight: 500,
        fontSize: 18,
        color: '#45423A',
        direction: 'rtl',
      }}>
        {text}
      </p>

    </div>
  );
}
