import { useEffect } from 'react';
import Mandala from '../components/Mandala';

const DOT_SIZE = 88.25;

let _chimePlayed = false;
function playChime() {
  if (_chimePlayed) return;
  _chimePlayed = true;
  setTimeout(() => { _chimePlayed = false; }, 500);
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t   = ctx.currentTime;

    const drop = (freq, start, peak) => {
      const sine = ctx.createOscillator();
      const tri  = ctx.createOscillator();
      const g1   = ctx.createGain();
      const g2   = ctx.createGain();
      sine.connect(g1); g1.connect(ctx.destination);
      tri.connect(g2);  g2.connect(ctx.destination);
      sine.type = 'sine';     sine.frequency.value = freq;
      tri.type  = 'triangle'; tri.frequency.value  = freq;
      g1.gain.setValueAtTime(0, t + start);
      g1.gain.linearRampToValueAtTime(peak, t + start + 0.025);
      g1.gain.exponentialRampToValueAtTime(peak * 0.4, t + start + 0.125);
      g1.gain.exponentialRampToValueAtTime(0.0001, t + start + 0.65);
      g2.gain.setValueAtTime(0, t + start);
      g2.gain.linearRampToValueAtTime(peak * 0.45, t + start + 0.025);
      g2.gain.exponentialRampToValueAtTime(peak * 0.15, t + start + 0.125);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + start + 0.50);
      sine.start(t + start); sine.stop(t + start + 0.70);
      tri.start(t + start);  tri.stop(t + start + 0.55);
    };

    drop(659, 0,    0.11); // E5
    drop(988, 0.22, 0.11); // B5

    setTimeout(() => ctx.close(), 1500);
  } catch (_) {}
}

export default function EventSavedScreen({ event, onDone }) {
  useEffect(() => {
    playChime();
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 21, color: '#45423A',
          direction: 'rtl', textAlign: 'center', margin: 0,
        }}>
          האירוע תועד בהצלחה
        </p>

        {/* Mandala — slow continuous rotation */}
        <div style={{ animation: 'spin 14s linear infinite' }}>
          <Mandala
            timeOfDay={event.timeOfDay || 'morning'}
            intensity={event.rating || 3}
            color={event.color || '#183497'}
            size={200}
          />
        </div>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A',
          direction: 'rtl', textAlign: 'center', margin: 0,
        }}>
          מעדכן את לוח האירועים...
        </p>

      </div>

      {/* Bottom grid decoration */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(4, ${DOT_SIZE}px)`,
        gap: 0, justifyContent: 'center', pointerEvents: 'none',
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            width: DOT_SIZE, height: DOT_SIZE, borderRadius: '50%',
            background: '#EFECDE',
          }} />
        ))}
      </div>

    </div>
  );
}
