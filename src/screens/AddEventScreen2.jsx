import { useState } from 'react';

/* ── Icons ── */
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

/* ── Outermost dot-ring from each mandala shape ──
   Used to render the decorative outer ring in the background.       */
const OUTER = {
  morning:   { r: 33.37, dotR: 6.18, n: 9  },
  noon:      { r: 35.05, dotR: 4.67, n: 18 },
  afternoon: { r: 35.06, dotR: 4.67, n: 18 },
  evening:   { r: 32.52, dotR: 6.91, n: 13 },
  night:     { r: 33.36, dotR: 6.18, n: 19 },
};
const VIEWBOX = 81; // same viewBox for every mandala shape

function polarPts(radius, count) {
  return Array.from({ length: count }, (_, i) => {
    const a = (-90 + (360 / count) * i) * (Math.PI / 180);
    return { x: radius * Math.cos(a), y: radius * Math.sin(a) };
  });
}

/* ── 5-ring target config ──
   Each zone is 26 px wide (radius), giving a 52 px finger hit area per ring.
   d = outer diameter (border-box), b = border width (0 = solid circle).
   Intensity 1 = innermost, 5 = outermost.                           */
const RINGS = [
  { d: 52,  b: 0,  color: '#E3E0D8' },  // intensity 1 — solid center dot (innermost)
  { d: 104, b: 27, color: '#D2CFC6' },  // intensity 2 (1px overlap to kill anti-alias gap)
  { d: 156, b: 27, color: '#C4C1B8' },  // intensity 3
  { d: 208, b: 27, color: '#B9B6AC' },  // intensity 4
  { d: 260, b: 27, color: '#B0ADA3' },  // intensity 5 (outermost)
];

const TARGET_R = 130;  // half of 260 — the outer radius of ring 5
const WIDGET   = 360;  // large enough for decorative dots (~148px) to sit outside ring 5 (130px)
const SVG_HALF = VIEWBOX / 2; // 40.5

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function AddEventScreen2({ onNext, onBack, onClose, timeOfDay = 'morning' }) {
  const [rating,  setRating]  = useState(null);
  const [pressed, setPressed] = useState(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  function handleTargetClick(e) {
    const rect   = e.currentTarget.getBoundingClientRect();
    const dx     = e.clientX - (rect.left + rect.width  / 2);
    const dy     = e.clientY - (rect.top  + rect.height / 2);
    const dist   = Math.sqrt(dx * dx + dy * dy);
    const outerR = rect.width / 2; // use visual size so zoom doesn't break hit-testing
    if (dist > outerR + 6) return;
    const zone   = Math.ceil((dist / outerR) * 5);
    setRating(Math.max(1, Math.min(5, zone)));
  }

  const outer = OUTER[timeOfDay] || OUTER.morning;
  const dots  = polarPts(outer.r, outer.n);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar: chevron (right, back) · indicator (center) · X (left, exit) ── */}
      <div style={{ position: 'relative', padding: '20px 20px 0' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', direction: 'rtl',
          justifyContent: 'space-between', alignItems: 'center', height: 24,
        }}>
          <button onClick={onBack} {...press('back')} style={{
            ...iconBtn, opacity: pressed === 'back' ? 0.4 : 1, transition: 'opacity 0.12s ease',
          }}><ChevronRightIcon /></button>
          <button onClick={onClose} {...press('close')} style={{
            ...iconBtn, opacity: pressed === 'close' ? 0.4 : 1, transition: 'opacity 0.12s ease',
          }}><CloseIcon /></button>
        </div>

        {/* 5-step indicator — step 2 active */}
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 6 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 8, width: i === 1 ? 24 : 8, borderRadius: 4,
                background: i === 1 ? '#323232' : 'rgba(50,50,50,0.25)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Title + subtitle ── */}
      <div style={{ padding: '24px 28px 0' }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: 0,
        }}>
          דרג את עוצמת האירוע
        </p>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#87837A',
          textAlign: 'right', direction: 'rtl', lineHeight: '17px', margin: '8px 0 0',
        }}>
          לחץ על טבעת מ-1 (הכי נמוך) עד 5 (הכי גבוה) על מנת לדרג את העוצמה
        </p>
      </div>

      {/* ── Intensity selector ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: WIDGET, height: WIDGET }}>

          {/* Outer mandala dot-ring — decorative background only */}
          <svg
            width={WIDGET} height={WIDGET}
            viewBox={`${-SVG_HALF} ${-SVG_HALF} ${VIEWBOX} ${VIEWBOX}`}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {dots.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={outer.dotR}
                      fill="rgba(235,232,216,0.47)" />
            ))}
          </svg>

          {/* 5-ring interactive target — centered inside the SVG */}
          <div
            onClick={handleTargetClick}
            style={{
              position: 'absolute',
              width: TARGET_R * 2, height: TARGET_R * 2,
              left: (WIDGET - TARGET_R * 2) / 2,
              top:  (WIDGET - TARGET_R * 2) / 2,
              cursor: 'pointer',
            }}
          >
            {RINGS.map((ring, idx) => {
              const intensity  = idx + 1;
              const isSelected = rating === intensity;
              const color = isSelected ? '#183497' : ring.color;
              return (
                <div key={idx} style={{
                  position: 'absolute',
                  width: ring.d, height: ring.d,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background:  ring.b === 0 ? color : 'transparent',
                  border:      ring.b > 0   ? `${ring.b}px solid ${color}` : 'none',
                  boxSizing: 'border-box',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                }} />
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Continue button — enabled once a ring is selected ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 24px 44px' }}>
        <button
          onClick={() => rating && onNext({ rating })}
          {...press('next')}
          style={{
            width: 140, padding: '16px 0', borderRadius: 30,
            border:      rating ? 'none' : '1.5px solid #D4D1C3',
            background:  rating ? (pressed === 'next' ? '#2E2B25' : '#45423A') : 'transparent',
            color:       rating ? '#F8F5EE' : '#45423A',
            border:      rating ? 'none' : '1.5px solid #45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 17,
            cursor: rating ? 'pointer' : 'default',
            transform: pressed === 'next' && rating ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.15s ease, border 0.15s ease, color 0.15s ease, transform 0.12s ease',
            boxSizing: 'border-box',
          }}
        >
          המשך
        </button>
      </div>

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
