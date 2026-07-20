import { useEffect, useRef, useState } from 'react';
import HomeScreen from './HomeScreen';
import Mandala, { getTimeOfDay } from '../components/Mandala';
import { MOCK_EVENTS } from '../utils/mockEvents';

const SCRIM = 'rgba(28,28,28,0.83)';

const INDEX_A = 13;
const INDEX_B = 23;

const CARD_W = 244;
const CARD_H = 133;

function CheckBadge({ top, left, open }) {
  return (
    <div style={{
      position: 'absolute', top, left, zIndex: 11,
      width: 28, height: 28, borderRadius: '50%',
      background: '#323232', border: '2px solid #ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0,
      transform: open ? 'scale(1)' : 'scale(0.6)',
      transition: 'opacity 0.3s ease 0.25s, transform 0.3s cubic-bezier(0.32,0.72,0,1) 0.25s',
    }}>
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path d="M1 4.5L4.2 7.5L11 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function BrightMandala({ rect, event, open }) {
  const size = rect.size * 0.85;
  return (
    <div style={{
      position: 'absolute', zIndex: 10,
      top:  rect.top  + rect.size / 2 - size / 2,
      left: rect.left + rect.size / 2 - size / 2,
      opacity: open ? 1 : 0,
      transition: 'opacity 0.35s ease 0.1s',
    }}>
      <Mandala
        timeOfDay={getTimeOfDay(event.timestamp)}
        intensity={event.rating || 1}
        color={event.color}
        size={size}
      />
    </div>
  );
}

function badgePos(rect) {
  const cx = rect.left + rect.size / 2;
  const cy = rect.top  + rect.size / 2;
  const r  = (rect.size * 0.85) / 2;
  return { left: cx + r * 0.7071 - 14, top: cy - r * 0.7071 - 14 };
}

export default function WalkthroughScreen5({ onDone, onSkip }) {
  const containerRef = useRef(null);
  const dotEls       = useRef({});
  const [rectA, setRectA] = useState(null);
  const [rectB, setRectB] = useState(null);
  const [open,    setOpen]    = useState(false);
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    try { const a = new Audio('/sound-051.mp3'); a.volume = 0.4; a.play(); } catch (_) {}
  }, []);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  function captureDotRef(index, el) {
    if (index === INDEX_A || index === INDEX_B) dotEls.current[index] = el;
  }

  useEffect(() => {
    const elA = dotEls.current[INDEX_A];
    const elB = dotEls.current[INDEX_B];
    if (!elA || !elB || !containerRef.current) return;
    const base = containerRef.current.getBoundingClientRect();
    const a = elA.getBoundingClientRect();
    const b = elB.getBoundingClientRect();
    setRectA({ top: a.top - base.top, left: a.left - base.left, size: a.width });
    setRectB({ top: b.top - base.top, left: b.left - base.left, size: b.width });

    /* Reveal mandalas + card after scrim settles */
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, []);

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'none',
      }}>
        <HomeScreen
          previewEvents={MOCK_EVENTS} addButtonBg="#ffffff" dotRefCallback={captureDotRef}
          hideIndices={[INDEX_A, INDEX_B]}
          onNavigate={() => {}} onAddEvent={() => {}} onEventPress={() => {}}
        />
      </div>

      {/* Scrim — instant full coverage */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: SCRIM }} />

      {rectA && <BrightMandala rect={rectA} event={MOCK_EVENTS[INDEX_A]} open={open} />}
      {rectB && <BrightMandala rect={rectB} event={MOCK_EVENTS[INDEX_B]} open={open} />}

      {rectA && <CheckBadge {...badgePos(rectA)} open={open} />}
      {rectB && <CheckBadge {...badgePos(rectB)} open={open} />}

      {/* Card slides up after scrim */}
      {rectB && (
        <div style={{
          position: 'absolute', zIndex: 10,
          top: rectB.top + rectB.size / 2 - CARD_H / 2, left: rectB.left + rectB.size + 12,
          width: CARD_W, height: CARD_H, borderRadius: 18,
          background: '#ffffff', boxSizing: 'border-box',
          padding: '16px 18px 14px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          direction: 'rtl',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.32,0.72,0,1) 0.1s',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
            textAlign: 'right', margin: 0, lineHeight: 1.4,
          }}>
            מצא דפוסים משותפים על ידי לחיצה ארוכה על אירועים שונים
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
              4/4
            </span>
            <button onClick={onDone} {...press('next')} style={{
              padding: '8px 16px', borderRadius: 30, border: 'none',
              background: pressed === 'next' ? '#2E2B25' : '#45423A', color: '#F8F5EE',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
              whiteSpace: 'nowrap', letterSpacing: '0.3px',
              transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.12s ease, background 0.12s ease',
            }}>
              כניסה לאירועים
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
