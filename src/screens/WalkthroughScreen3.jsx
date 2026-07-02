import { useEffect, useState } from 'react';

import HomeScreen from './HomeScreen';
import { MOCK_EVENTS } from '../utils/mockEvents';

const SCRIM  = 'rgba(28,28,28,0.83)';
const CARD_W = 244;
const CARD_H = 133;

export default function WalkthroughScreen3({ onNext, onSkip }) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(null);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

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

      {/* Scrim — instant full coverage, only card animates */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: SCRIM,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Card slides up as scrim appears */}
        <div style={{
          width: CARD_W, height: CARD_H, borderRadius: 18,
          background: '#ffffff', boxSizing: 'border-box',
          padding: '16px 18px 14px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          direction: 'rtl',
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1) 0.1s',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
            textAlign: 'right', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line',
          }}>
            {'גלול את לוח האירועים ולחץ על\nאירוע כדי לראות את סיכומו'}
          </p>

          <div style={{
            display: 'flex', flexDirection: 'row', direction: 'rtl',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span onClick={onSkip} {...press('skip')} style={{
              fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#45423A', cursor: 'pointer',
              opacity: pressed === 'skip' ? 0.5 : 1, transition: 'opacity 0.12s ease',
            }}>
              דלג
            </span>
            <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#87837A' }}>
              2/4
            </span>
            <button onClick={onNext} {...press('next')} style={{
              width: 90, padding: '8px 0', borderRadius: 30, border: 'none',
              background: pressed === 'next' ? '#2E2B25' : '#45423A', color: '#F8F5EE',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.12s ease, background 0.12s ease',
            }}>
              המשך
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
