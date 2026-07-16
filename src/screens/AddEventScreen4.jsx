import { useState } from 'react';
import { useApp } from '../context/AppContext';

/* Question pool — gendered pairs [masculine/other, feminine] */
const QUESTIONS = [
  ['מה הכי זכור לך מהאירוע?',                                                          'מה הכי זכור לך מהאירוע?'],
  ['מה היה שונה הפעם באירוע?',                                                          'מה היה שונה הפעם באירוע?'],
  ['מה קרה מיד אחרי?',                                                                  'מה קרה מיד אחרי?'],
  ['איך הרגשת במהלך האירוע?',                                                           'איך הרגשת במהלך האירוע?'],
  ['מה הייתה התחושה הדומיננטית באירוע?',                                                'מה הייתה התחושה הדומיננטית באירוע?'],
  ['האם משהו הפתיע אותך באירוע?',                                                       'האם משהו הפתיע אותך באירוע?'],
  ['מה היה החלק הכי מאתגר?',                                                            'מה היה החלק הכי מאתגר?'],
  ['מה היה החלק הכי מרגיע?',                                                            'מה היה החלק הכי מרגיע?'],
  ['האם זה קרה במקום מוכר?',                                                            'האם זה קרה במקום מוכר?'],
  ['האם יש משהו שחזר על עצמו באירוע?',                                                 'האם יש משהו שחזר על עצמו באירוע?'],
  ['האם הבחנת במשהו חדש?',                                                              'האם הבחנת במשהו חדש?'],
  ['מה היה הדבר המרכזי שהעסיק אותך באותו רגע?',                                        'מה היה הדבר המרכזי שהעסיק אותך באותו רגע?'],
  ['מה היה שונה באירוע הזה לעומת מקרים דומים?',                                        'מה היה שונה באירוע הזה לעומת מקרים דומים?'],
  ['מה הדבר הראשון שעלה לך לראש באותו רגע?',                                           'מה הדבר הראשון שעלה לך לראש באותו רגע?'],
  ['אם היית צריך לתת לאירוע כותרת, מה היא הייתה?',                                     'אם היית צריכה לתת לאירוע כותרת, מה היא הייתה?'],
  ['איזו תחושה הייתה הכי נוכחת עבורך?',                                                'איזו תחושה הייתה הכי נוכחת עבורך?'],
  ['מה גרם לתחושת אי הנוחות?',                                                          'מה גרם לתחושת אי הנוחות?'],
  ['האם הייתה תחושה של הקלה לאחר מכן?',                                                'האם הייתה תחושה של הקלה לאחר מכן?'],
  ['מה הרגשת בגוף במהלך האירוע?',                                                      'מה הרגשת בגוף במהלך האירוע?'],
  ['האם חווית משהו דומה בעבר?',                                                         'האם חווית משהו דומה בעבר?'],
  ['האם זיהית טריגר מסוים?',                                                            'האם זיהית טריגר מסוים?'],
  ['מה אתה לוקח מהאירוע הזה?',                                                          'מה את לוקחת מהאירוע הזה?'],
  ['מה היית אומר לעצמך אם היית מסתכל על האירוע מהצד?',                                 'מה היית אומרת לעצמך אם היית מסתכלת על האירוע מהצד?'],
  ['מה למדת על עצמך דרך האירוע?',                                                      'מה למדת על עצמך דרך האירוע?'],
];

/* Hebrew keyboard — standard QWERTY mapping */
const KB_ROWS = [
  ['.', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
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
function BackspaceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
      <line x1="18" y1="9" x2="12" y2="15"/>
      <line x1="12" y1="9" x2="18" y2="15"/>
    </svg>
  );
}

/* ── Hebrew virtual keyboard ── */
function HebrewKeyboard({ onKey, onBackspace, onDone }) {
  const [pressedKey, setPressedKey] = useState(null);

  function mkKey(id, content, onPress, opts = {}) {
    const { flex = 1, fontSize = 17, dark = false } = opts;
    const isPressed = pressedKey === id;
    return (
      <button
        key={id}
        onPointerDown={() => { setPressedKey(id); onPress(); }}
        onPointerUp={() => setPressedKey(null)}
        onPointerLeave={() => setPressedKey(null)}
        style={{
          flex,
          height: 44,
          borderRadius: 6,
          background: isPressed ? '#C0BDB1' : (dark ? '#ADAAA0' : '#F8F5EE'),
          border: 'none',
          boxShadow: '0 1px 0 rgba(0,0,0,0.25)',
          fontFamily: 'Atlas',
          fontSize,
          color: '#45423A',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          minWidth: 0,
        }}
      >
        {content}
      </button>
    );
  }

  return (
    <div style={{
      background: '#B4B1A6',
      padding: '10px 4px 28px',
      direction: 'ltr',
    }}>
      {KB_ROWS.map((row, ri) => (
        <div key={ri} style={{
          display: 'flex', gap: 5, marginBottom: 8, justifyContent: 'center',
        }}>
          {ri === 2 && <div style={{ flex: 0.5 }} />}
          {row.map(key => mkKey(key, key, () => onKey(key)))}
          {ri === 2 && <div style={{ flex: 0.5 }} />}
        </div>
      ))}
      {/* Bottom row: done · space · backspace */}
      <div style={{ display: 'flex', gap: 5 }}>
        {mkKey('done', 'סיום', onDone, { flex: 1.5, fontSize: 14, dark: true })}
        {mkKey('space', 'רווח', () => onKey(' '), { flex: 4, fontSize: 14 })}
        {mkKey('back', <BackspaceIcon />, onBackspace, { flex: 1.5, dark: true })}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function AddEventScreen4({ onNext, onBack, onClose }) {
  const { gender } = useApp();
  const isFemale = gender === 'female';
  const [questionPair] = useState(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
  const question = isFemale ? questionPair[1] : questionPair[0];
  const placeholder = isFemale ? 'הקלידי כאן..' : 'הקלד כאן..';
  const [text, setText]               = useState('');
  const [pressed, setPressed]         = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  function handleKey(key) {
    setText(prev => prev + key);
  }
  function handleBackspace() {
    setText(prev => prev.slice(0, -1));
  }

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar ── */}
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
          onClick={() => setShowKeyboard(true)}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          inputMode="none"
          readOnly
          style={{
            width: '100%', height: '100%',
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 32, color: '#323232',
            background: 'transparent', border: 'none', outline: 'none',
            resize: 'none', textAlign: 'right', direction: 'rtl',
            lineHeight: 1.3, padding: 0, cursor: 'text',
          }}
        />
      </div>

      {/* ── Bottom row: continue · record ── */}
      <div style={{
        display: 'flex', flexDirection: 'row', direction: 'rtl',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '0 24px 44px',
        transition: 'opacity 0.2s ease',
        opacity: showKeyboard ? 0 : 1,
        pointerEvents: showKeyboard ? 'none' : 'auto',
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

      {/* ── Virtual Hebrew keyboard — slides up from bottom ── */}
      <div style={{
        overflow: 'hidden',
        maxHeight: showKeyboard ? '320px' : '0px',
        transition: 'max-height 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        <HebrewKeyboard
          onKey={handleKey}
          onBackspace={handleBackspace}
          onDone={() => setShowKeyboard(false)}
        />
      </div>

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
