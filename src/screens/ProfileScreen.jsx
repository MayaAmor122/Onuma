import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import DotFadeDecoration from '../components/DotFadeDecoration';

/* ── Icons ── */
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function DotsGridIcon() {
  const coords = [4, 10, 16];
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      {coords.flatMap(x => coords.map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#45423A" />
      )))}
    </svg>
  );
}
function StatCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

/* ── Stat card ── */
function StatCard({ icon, text, borderColor }) {
  return (
    <div style={{
      borderRadius: 16,
      border: `1.5px solid ${borderColor}`,
      padding: '20px 16px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      width: 168, height: 151, direction: 'rtl', boxSizing: 'border-box',
      background: '#F2EFE3',
    }}>
      <div>{icon}</div>
      <p style={{
        fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
        margin: 0, textAlign: 'right', lineHeight: 1.3, whiteSpace: 'pre-line',
      }}>
        {text}
      </p>
    </div>
  );
}

/* ── Editable field row ── */
function EditableField({ label, value, placeholder, onSave, type = 'text' }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);

  useEffect(() => { setDraft(value); }, [value]);

  function commit() {
    onSave(draft.trim());
    setEditing(false);
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{
        fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#45423A',
        textAlign: 'right', margin: '0 0 8px',
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', alignItems: 'center', gap: 10 }}>
        {editing ? (
          <input
            autoFocus
            type={type}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && commit()}
            onBlur={commit}
            style={{
              flex: 1, height: 48, borderRadius: 30, border: 'none',
              background: '#EBE8DB', padding: '0 18px', boxSizing: 'border-box',
              fontFamily: 'Atlas', fontWeight: 400, fontSize: 15, color: '#87837A',
              outline: 'none', textAlign: 'right', direction: 'rtl',
            }}
          />
        ) : (
          <div style={{
            flex: 1, height: 48, borderRadius: 30,
            background: '#EBE8DB', padding: '0 18px', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center',
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 15,
            color: '#87837A',
          }}>
            {value || placeholder}
          </div>
        )}
        <button
          onClick={editing ? commit : () => setEditing(true)}
          style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: '#EBE8DB', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <PencilIcon />
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function ProfileScreen({ onBack }) {
  const { userName, userEmail, updateProfile } = useApp();

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
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 60px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 24, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '0 0 28px',
        }}>
          החשבון שלי
        </p>

        <EditableField
          label="שם משתמש"
          value={userName}
          placeholder="שם משתמש"
          onSave={name => updateProfile({ name })}
        />

        <EditableField
          label="אימייל"
          value={userEmail}
          placeholder="אימייל"
          type="email"
          onSave={email => updateProfile({ email })}
        />

        {/* ── התהליך שלי ── */}
        <div style={{ marginTop: 54 }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#45423A',
            textAlign: 'right', direction: 'rtl', margin: '0 0 24px',
          }}>
            התהליך שלי
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '168px 168px', gap: 10, direction: 'rtl' }}>
            <StatCard icon={<DotsGridIcon />}  text="34 דפוסים התגלו לאורך הדרך"    borderColor="#FFC8CE" />
            <StatCard icon={<PlusIcon />}       text="החודש נוספו 30 אירועים חדשים"  borderColor="#183497" />
            <StatCard icon={<CalendarIcon />}   text={"30 ימי\nתיעוד ברצף"}            borderColor="#B6CDFF" />
            <StatCard icon={<StatCheckIcon />}  text={"תיעדת במשך\n84 ימים"}          borderColor="#00BE4A" />
          </div>
        </div>
      </div>

      {/* ── Decorative dots — pushed down so only top rows peek in ── */}
      <DotFadeDecoration style={{ bottom: -60 }} />

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
