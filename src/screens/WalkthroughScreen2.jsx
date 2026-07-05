import { useEffect, useRef, useState } from 'react';
import HomeScreen from './HomeScreen';
import { MOCK_EVENTS } from '../utils/mockEvents';

const SCRIM    = 'rgba(28,28,28,0.83)';
const CARD_W   = 244;
const CARD_H   = 133;
const CARD_GAP = 16;

/* Remove green from walkthrough mock events so none appears near the + button overlay. */
const WALKTHROUGH_EVENTS = MOCK_EVENTS.map(e =>
  e.color === '#00BE4A' ? { ...e, color: '#183497' } : e
);

/* ════════════════════════════════
   Walkthrough — step 2
   Spotlight on the "+" add-event button.
   Uses box-shadow for guaranteed pixel-perfect alignment: a transparent div
   is positioned with the same top/left/width/height as the button, so the
   hole in the scrim IS the button — no center-calculation drift possible.
════════════════════════════════ */
const BTN_SIZE = 72;
const BTN_LEFT = 16;
const BTN_BOTTOM = 98;

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function WalkthroughScreen2({ onNext, onSkip }) {
  const containerRef = useRef(null);
  const plusRef      = useRef(null);
  const [rect,    setRect]    = useState(null);
  const [open,    setOpen]    = useState(false);
  const [pressed, setPressed] = useState(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  useEffect(() => {
    if (!plusRef.current || !containerRef.current) return;
    const btnBox  = plusRef.current.getBoundingClientRect();
    const baseBox = containerRef.current.getBoundingClientRect();
    setRect({
      top:  btnBox.top  - baseBox.top,
      left: btnBox.left - baseBox.left,
      size: btnBox.width,
    });
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, []);

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

      {/* Live home screen, frozen behind the scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'none',
      }}>
        <HomeScreen
          previewEvents={WALKTHROUGH_EVENTS}
          onNavigate={() => {}} onAddEvent={() => {}} onEventPress={() => {}}
        />
      </div>

      {/* Fixed + button at bottom-left — the spotlight target */}
      <div
        ref={plusRef}
        style={{
          position: 'absolute',
          bottom: BTN_BOTTOM, left: BTN_LEFT,
          width: BTN_SIZE, height: BTN_SIZE, borderRadius: '50%',
          background: '#1C1C1C', border: '2px solid #ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9, pointerEvents: 'none', boxSizing: 'border-box',
        }}
      >
        <PlusIcon />
      </div>

      {/* Backup solid scrim — always rendered, fades away only once the spotlight
          is open. Prevents the 1-frame flash that occurs when rect is measured
          (the box-shadow spread scales with transform, so scale(0.001) covers ~10px). */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 11, pointerEvents: 'none',
        background: SCRIM,
        opacity: (rect && open) ? 0 : 1,
        transition: (rect && open) ? 'opacity 0.45s cubic-bezier(0.32,0.72,0,1)' : 'none',
      }} />

      {/* Box-shadow scrim: transparent div sits exactly over the button.
          Sits at zIndex:10, below backup scrim, until open. */}
      {rect && (
        <div style={{
          position: 'absolute', zIndex: 10, pointerEvents: 'none',
          top:    rect.top,
          left:   rect.left,
          width:  rect.size,
          height: rect.size,
          borderRadius: '50%',
          boxShadow: `0 0 0 9999px ${SCRIM}`,
          transform: open ? 'scale(1)' : 'scale(0.001)',
          transition: open ? 'transform 0.45s cubic-bezier(0.32,0.72,0,1)' : 'none',
        }} />
      )}

      {/* Info card — above everything */}
      {rect && (
        <div style={{
          position: 'absolute', zIndex: 12,
          top: rect.top - CARD_GAP - CARD_H, left: rect.left,
          width: CARD_W, height: CARD_H, borderRadius: 18,
          background: '#ffffff', boxSizing: 'border-box',
          padding: '16px 18px 14px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          direction: 'rtl',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
            textAlign: 'right', margin: 0, lineHeight: 1.4,
          }}>
            הוסף אירועים חדשים
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
              1/4
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
      )}

    </div>
  );
}
