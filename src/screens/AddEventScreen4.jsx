import { useState } from 'react';

/* Question pool — one is picked at random each time this screen mounts */
const QUESTIONS = [
  'מה הכי זכור לך מהאירוע?',
  'מה היה שונה הפעם באירוע?',
  'מה קרה מיד אחרי?',
  'איך הרגשת במהלך האירוע?',
  'מה הייתה התחושה הדומיננטית באירוע?',
  'האם משהו הפתיע אותך באירוע?',
  'מה היה החלק הכי מאתגר?',
  'מה היה החלק הכי מרגיע?',
  'האם זה קרה במקום מוכר?',
  'האם יש משהו שחזר על עצמו באירוע?',
  'האם הבחנת במשהו חדש?',
  'מה היה הדבר המרכזי שהעסיק אותך באותו רגע?',
  'מה היה שונה באירוע הזה לעומת מקרים דומים?',
  'מה הדבר הראשון שעלה לך לראש באותו רגע?',
  'אם היית צריך לתת לאירוע כותרת, מה היא הייתה?',
  'איזו תחושה הייתה הכי נוכחת עבורך?',
  'מה גרם לתחושת אי הנוחות?',
  'האם הייתה תחושה של הקלה לאחר מכן?',
  'מה הרגשת בגוף במהלך האירוע?',
  'האם חווית משהו דומה בעבר?',
  'האם זיהית טריגר מסוים?',
  'מה אתה לוקח מהאירוע הזה?',
  'מה היית אומר לעצמך אם היית מסתכל על האירוע מהצד?',
  'מה למדת על עצמך דרך האירוע?',
];

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
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3"/>
      <path d="M5 10a7 7 0 0 0 14 0"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8"  y1="22" x2="16" y2="22"/>
    </svg>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function AddEventScreen4({ onNext, onBack, onClose }) {
  const [question] = useState(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
  const [text, setText] = useState('');
  const [pressed, setPressed] = useState(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

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
            ...iconBtn,
            opacity: pressed === 'back' ? 0.4 : 1,
            transition: 'opacity 0.12s ease',
          }}><ChevronRightIcon /></button>
          <button onClick={onClose} {...press('close')} style={{
            ...iconBtn,
            opacity: pressed === 'close' ? 0.4 : 1,
            transition: 'opacity 0.12s ease',
          }}><CloseIcon /></button>
        </div>

        {/* 5-step indicator — step 4 active */}
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 6 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 8, width: i === 3 ? 24 : 8, borderRadius: 4,
                background: i === 3 ? '#323232' : 'rgba(50,50,50,0.25)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Title ── */}
      <p style={{
        fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A',
        textAlign: 'right', direction: 'rtl', margin: '24px 28px 0',
      }}>
        {question}
      </p>

      {/* ── Text area ── */}
      <div style={{ flex: 1, padding: '8px 28px 0' }}>
        <textarea
          className="event-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="הקלד כאן.."
          style={{
            width: '100%', height: '100%',
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 32, color: '#323232',
            background: 'transparent', border: 'none', outline: 'none',
            resize: 'none', textAlign: 'right', direction: 'rtl',
            lineHeight: 1.3, padding: 0,
          }}
        />
      </div>

      {/* ── Bottom row: continue (left) · record (right) ── */}
      <div style={{
        display: 'flex', flexDirection: 'row', direction: 'rtl',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '0 24px 44px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', alignItems: 'center', gap: 10 }}>
          <button {...press('mic')} style={{
            width: 52, height: 52, borderRadius: '50%',
            background: pressed === 'mic' ? '#D8D5CC' : '#EBE8DB',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            transform: pressed === 'mic' ? 'scale(0.94)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
          }}>
            <MicIcon />
          </button>
          <span style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#87837A',
            textAlign: 'right', whiteSpace: 'nowrap',
          }}>
            אפשר גם<br />להקליט
          </span>
        </div>

        <button
          onClick={() => onNext({ text })}
          {...press('next')}
          style={{
            width: 140, padding: '16px 0', borderRadius: 30, border: 'none',
            background: pressed === 'next' ? '#2E2B25' : '#45423A',
            color: '#F8F5EE',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 17, cursor: 'pointer',
            transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
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
