import DotFadeDecoration from '../components/DotFadeDecoration';
import { useApp } from '../context/AppContext';

/* ── Icons ── */
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="#87837A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

const CARDS = [
  {
    title: 'תובנות תקופתיות',
    subtitle: 'סיכום אוטומטי של הדפוסים בתקופה שנבחרה.',
  },
  {
    title: 'דפוסים שנשמרו במהלך החקירה',
    subtitle: 'קשרים שבחרת לשמור במהלך החקירה.',
  },
  {
    title: 'סיכום האירועים שנבחרו',
    subtitle: 'נתונים כלליים על התקופה.',
  },
];

/* ── Info card ── */
function InfoCard({ title, subtitle }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', direction: 'rtl', alignItems: 'flex-start', gap: 12,
      border: '1.5px solid #E2DFD0', borderRadius: 16,
      padding: '14px 16px', marginBottom: 10, boxSizing: 'border-box',
    }}>
      <div style={{ paddingTop: 2, flexShrink: 0 }}><CheckIcon /></div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <p style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#87837A', margin: 0 }}>
          {title}
        </p>
        <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#87837A', margin: '4px 0 0' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════
   Screen — placeholder only, no real report generation
════════════════════════════════ */
export default function ReportsScreen({ onBack }) {
  const { gender } = useApp();
  const isFemale = gender === 'female';
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar: back chevron ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 0' }}>
        <button onClick={onBack} style={iconBtn}><ChevronRightIcon /></button>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 0', position: 'relative', zIndex: 1 }}>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 24, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '0 0 8px',
        }}>
          סיכום תקופתי
        </p>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 15, color: '#323232',
          textAlign: 'right', direction: 'rtl', margin: '0 0 20px',
        }}>
          הפקת דו"ח תקופתי כוללת
        </p>

        {CARDS.map(card => <InfoCard key={card.title} {...card} />)}

        <div style={{ height: 1, background: '#D4D1C3', margin: '24px 0 34px' }} />

        {/* Create report */}
        <button
          disabled
          style={{
            width: '100%', padding: '16px 0', borderRadius: 30, border: 'none',
            background: '#45423A', color: '#F8F5EE',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 16, cursor: 'default',
          }}
        >
          {isFemale ? 'צרי דו"ח חדש' : 'צור דו"ח חדש'}
        </button>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '8px 0 24px',
        }}>
          המערכת תפיק מסמך המרכז את התובנות והדפוסים שנשמרו.
        </p>

        {/* Share with doctor */}
        <button
          disabled
          style={{
            width: '100%', padding: '16px 0', borderRadius: 30,
            border: '1.5px solid #45423A', background: 'rgba(248,245,238,0.63)', color: '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 16, cursor: 'default',
          }}
        >
          {isFemale ? 'שתפי עם מטפל' : 'שתף עם מטפל'}
        </button>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '8px 0 28px',
        }}>
          {isFemale ? 'בחרי כיצד לשלוח את הדוח לאחר יצירתו.' : 'בחר כיצד לשלוח את הדוח לאחר יצירתו.'}
        </p>

      </div>

      {/* ── Decorative dots ── */}
      <DotFadeDecoration />

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
