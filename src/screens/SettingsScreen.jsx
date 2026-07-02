import { useApp } from '../context/AppContext';
import DotFadeDecoration from '../components/DotFadeDecoration';

/* ── Icons ── */
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#183497" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

/* ── Toggle ── */
function Toggle({ on, onChange }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: 70, height: 34, borderRadius: 17,
        background: on ? '#00BE4A' : '#D4D1C3',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s ease', flexShrink: 0,
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: '50%', background: '#ffffff',
        position: 'absolute', top: 3,
        left: on ? 3 : 39,
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
      }} />
    </div>
  );
}

/* ── Outlined row card ── */
function RowCard({ children, paddingLeft = 18 }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', direction: 'rtl', alignItems: 'center',
      justifyContent: 'space-between', height: 48,
      paddingRight: 18, paddingLeft,
      border: '1.5px solid #323232', borderRadius: 30,
      boxSizing: 'border-box', marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

/* ── Section label ── */
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#183497',
      textAlign: 'right', direction: 'rtl', margin: '0 0 10px',
    }}>
      {children}
    </p>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function SettingsScreen({ onBack }) {
  const { notificationsEnabled, setNotificationsEnabled } = useApp();

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar: back chevron ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 0' }}>
        <button onClick={onBack} style={iconBtn}><ChevronRightIcon /></button>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 0', position: 'relative', zIndex: 1 }}>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 24, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '0 0 28px',
        }}>
          הגדרות
        </p>

        <SectionLabel>התראות</SectionLabel>
        <RowCard paddingLeft={8}>
          <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#323232' }}>
            אני רוצה לקבל התראות
          </span>
          <Toggle on={notificationsEnabled} onChange={setNotificationsEnabled} />
        </RowCard>

        <div style={{ marginTop: 36 }}>
          <SectionLabel>הגדרות נוספות</SectionLabel>
          <RowCard>
            <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#323232' }}>
              שפת הממשק
            </span>
            <ChevronLeftIcon />
          </RowCard>
          <RowCard>
            <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#323232' }}>
              תנאי שימוש
            </span>
            <ChevronLeftIcon />
          </RowCard>
        </div>

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
