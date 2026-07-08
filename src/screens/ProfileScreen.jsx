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

      {/* ── Content ── */}
      <div style={{ padding: '20px 24px 0', position: 'relative', zIndex: 1 }}>
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
