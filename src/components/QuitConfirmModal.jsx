import { useEffect, useState } from 'react';

export default function QuitConfirmModal({ onBack, onQuit }) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(null);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(28,28,28,0.63)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.2s ease',
    }}>
      <div style={{
        width: 260, borderRadius: 18,
        background: '#ffffff', boxSizing: 'border-box',
        padding: '24px 20px',
        display: 'flex', flexDirection: 'column', gap: 25,
        direction: 'rtl',
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: 'transform 0.2s cubic-bezier(0.32,0.72,0,1)',
      }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 13,
          color: '#45423A', textAlign: 'center', margin: 0, lineHeight: '17px', whiteSpace: 'pre-line',
        }}>
          {'האם אתה בטוח שאתה רוצה\nלצאת? האירוע שלך לא יישמר..'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, direction: 'ltr' }}>
          {/* Left — חזרה לאירוע (azure fill) */}
          <button
            onClick={onBack}
            {...press('back')}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 30, border: 'none',
              background: pressed === 'back' ? '#2E2B25' : '#45423A',
              color: '#F8F5EE',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
              transform: pressed === 'back' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.12s ease, background 0.12s ease',
            }}
          >
            חזרה לאירוע
          </button>

          {/* Right — אל תשמור (outlined) */}
          <button
            onClick={onQuit}
            {...press('quit')}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 30,
              background: pressed === 'quit' ? 'rgba(69,66,58,0.08)' : 'transparent',
              border: '1.5px solid',
              borderColor: pressed === 'quit' ? '#2E2B25' : '#45423A',
              color: '#45423A',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
              transform: pressed === 'quit' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.12s ease, background 0.12s ease, border-color 0.12s ease',
            }}
          >
            אל תשמור
          </button>
        </div>
      </div>
    </div>
  );
}
