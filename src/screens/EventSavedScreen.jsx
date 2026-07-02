import { useEffect } from 'react';
import Mandala from '../components/Mandala';

const DOT_SIZE = 88.25;

export default function EventSavedScreen({ event, onDone }) {
  useEffect(() => {
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
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 21, color: '#183497',
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
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#183497',
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
