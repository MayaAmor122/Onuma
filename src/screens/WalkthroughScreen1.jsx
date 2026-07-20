import { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import { MOCK_EVENTS } from '../utils/mockEvents';

/* ════════════════════════════════
   Walkthrough — step 1
   Live home screen behind a dark scrim, intro line.
   "התחל" triggers the move to step 2. Back does nothing.
════════════════════════════════ */
export default function WalkthroughScreen1({ onDone }) {
  const [fading,  setFading]  = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    try { const a = new Audio('/sound-036.mp3'); a.volume = 0.4; a.play(); } catch (_) {}
  }, []);

  const press = {
    onPointerDown: () => setPressed(true),
    onPointerUp:   () => setPressed(false),
    onPointerLeave:() => setPressed(false),
  };

  function handleStart() {
    setFading(true);
    setTimeout(onDone, 400);
  }

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

      {/* Live home screen, frozen behind the scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'none',
      }}>
        <HomeScreen
          previewEvents={MOCK_EVENTS} addButtonBg="#ffffff"
          onNavigate={() => {}} onAddEvent={() => {}} onEventPress={() => {}}
        />
      </div>

      {/* Dark scrim — Black 83%, stays fully opaque until the screen switches */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: 'rgba(28,28,28,0.83)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 18,
            color: '#ffffff', direction: 'rtl', textAlign: 'center',
          }}>
            סיור קצר ומתחילים!
          </p>

          <button onClick={handleStart} {...press} style={{
            padding: '0 32px', height: 40, borderRadius: 30, border: 'none',
            background: pressed ? '#E8E5DE' : '#F8F5EE', color: '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            transform: pressed ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.12s ease, background 0.12s ease',
          }}>
            התחל
          </button>
        </div>
      </div>

    </div>
  );
}
