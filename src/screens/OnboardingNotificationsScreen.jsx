import { useState } from 'react';
import DotFadeDecoration from '../components/DotFadeDecoration';

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

const OPTIONS = [
  { id: 'male',   label: 'זכר'  },
  { id: 'female', label: 'נקבה' },
  { id: 'other',  label: 'אחר'  },
];

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function OnboardingNotificationsScreen({ onNext, onBack }) {
  const [pressed, setPressed] = useState(null);
  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', direction: 'rtl',
      overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Back chevron ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '40px 28px 0' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
        }}>
          <ChevronRightIcon />
        </button>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A',
          textAlign: 'right', margin: '0 0 28px',
        }}>
          כיצד תרצה שנפנה אלייך?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNext(id)}
              {...press(id)}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 30,
                border: '1.5px solid #45423A',
                background: pressed === id ? 'rgba(69,66,58,0.10)' : 'transparent',
                borderColor: pressed === id ? '#2E2B25' : '#45423A',
                color: '#45423A',
                fontFamily: 'Atlas', fontWeight: 400, fontSize: 16,
                cursor: 'pointer', boxSizing: 'border-box',
                transform: pressed === id ? 'scale(0.97)' : 'scale(1)',
                transition: 'transform 0.12s ease, background 0.12s ease, border-color 0.12s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>

      </div>

      {/* ── Decorative dots ── */}
      <DotFadeDecoration />

    </div>
  );
}
