import { useEffect } from 'react';
import Mandala from '../components/Mandala';

const DOT_SIZE = 88.25;

let _chimePlayed = false;
function playChime() {
  if (_chimePlayed) return;
  _chimePlayed = true;
  setTimeout(() => { _chimePlayed = false; }, 500);
  try {
    const audio = new Audio('/sound-036.mp3');
    audio.volume = 0.4;
    audio.play();
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
