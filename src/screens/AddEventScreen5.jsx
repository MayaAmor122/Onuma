import { useState } from 'react';
import { useApp } from '../context/AppContext';

/* ── Default event types — ordered so pair[0]=right(140px), pair[1]=left(208px) ── */
const DEFAULT_TYPES = [
  'ניקיון', 'הסתרה',
  'מחשבה טורדנית', 'בדיקה',
  'ספירה', 'חזרתיות',
  'הימנעות', 'ארגון',
  'סידור', 'צורך בוודאות',
  'החלטה או בחירה', 'אישור',
];

function toPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1] ?? null]);
  }
  return pairs;
}

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

/* ── Single chip ── */
function TypeChip({ label, width, selected, onPress }) {
  const [chipPressed, setChipPressed] = useState(false);
  return (
    <button
      onClick={onPress}
      onPointerDown={() => setChipPressed(true)}
      onPointerUp={() => setChipPressed(false)}
      onPointerLeave={() => setChipPressed(false)}
      style={{
        width, height: 56, borderRadius: 30,
        border: selected ? 'none' : '1.5px solid #45423A',
        background: selected
          ? (chipPressed ? '#0F2370' : '#183497')
          : (chipPressed ? 'rgba(69,66,58,0.08)' : 'transparent'),
        color: selected ? '#F8F5EE' : '#45423A',
        fontFamily: 'Atlas', fontWeight: selected ? 700 : 400, fontSize: 16,
        cursor: 'pointer', flexShrink: 0,
        boxSizing: 'border-box',
        transform: chipPressed ? 'scale(0.96)' : 'scale(1)',
        transition: 'background 0.12s ease, transform 0.12s ease',
      }}
    >
      {label}
    </button>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function AddEventScreen5({ onSave, onBack, onClose }) {
  const { gender } = useApp();
  const isFemale = gender === 'female';
  const [eventTypes,    setEventTypes]    = useState(DEFAULT_TYPES);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [addingCustom,  setAddingCustom]  = useState(false);
  const [customText,    setCustomText]    = useState('');
  const [pressed,       setPressed]       = useState(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  function toggleType(type) {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  }

  function confirmCustom() {
    const trimmed = customText.trim();
    if (trimmed) {
      if (!eventTypes.includes(trimmed)) setEventTypes(prev => [...prev, trimmed]);
      setSelectedTypes(prev => new Set([...prev, trimmed]));
    }
    setCustomText('');
    setAddingCustom(false);
  }

  const pairs    = toPairs(eventTypes);
  const hasTypes = selectedTypes.size > 0;

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

        {/* 5-step indicator — step 5 (last) active */}
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 6 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 8, width: i === 4 ? 24 : 8, borderRadius: 4,
                background: i === 4 ? '#323232' : 'rgba(50,50,50,0.25)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', direction: 'rtl' }}>

        {/* Title + subtitle */}
        <div style={{ padding: '24px 28px 0' }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A',
            textAlign: 'right', margin: 0,
          }}>
            {isFemale ? 'בחרי את סוג האירוע' : 'בחר את סוג האירוע'}
          </p>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A',
            textAlign: 'right', margin: '6px 0 0',
          }}>
            ניתן לבחור יותר מסוג אחד
          </p>
        </div>

        {/* ── Chip rows ── */}
        <div style={{ padding: '20px 16px 0' }}>
          {pairs.map(([a, b], rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'flex', flexDirection: 'row', direction: 'rtl',
                justifyContent: 'space-between', marginBottom: 10,
              }}
            >
              <TypeChip
                label={a}
                width={rowIdx % 2 === 0 ? 140 : 208}
                selected={selectedTypes.has(a)}
                onPress={() => toggleType(a)}
              />
              {b && (
                <TypeChip
                  label={b}
                  width={rowIdx % 2 === 0 ? 208 : 140}
                  selected={selectedTypes.has(b)}
                  onPress={() => toggleType(b)}
                />
              )}
            </div>
          ))}

          {/* Add custom type */}
          <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'flex-start', marginTop: 6, marginBottom: 20 }}>
            {addingCustom ? (
              <input
                autoFocus
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                onBlur={confirmCustom}
                onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                placeholder={isFemale ? 'הקלידי סוג אירוע...' : 'הקלד סוג אירוע...'}
                style={{
                  height: 48, borderRadius: 30,
                  border: '1.5px solid #45423A', background: 'transparent',
                  color: '#45423A', caretColor: '#45423A',
                  fontFamily: 'Atlas', fontWeight: 500, fontSize: 14,
                  textAlign: 'right', direction: 'rtl',
                  padding: '0 20px', boxSizing: 'border-box',
                  outline: 'none', minWidth: 200,
                }}
              />
            ) : (
              <button
                onClick={() => setAddingCustom(true)}
                {...press('add_type')}
                style={{
                  height: 48, padding: '0 24px', borderRadius: 30,
                  border: '1.5px solid #45423A',
                  background: pressed === 'add_type' ? 'rgba(69,66,58,0.08)' : 'transparent',
                  borderColor: pressed === 'add_type' ? '#2E2B25' : '#45423A',
                  color: '#45423A',
                  fontFamily: 'Atlas', fontWeight: 500, fontSize: 14,
                  cursor: 'pointer',
                  transform: pressed === 'add_type' ? 'scale(0.97)' : 'scale(1)',
                  transition: 'background 0.12s ease, transform 0.12s ease, border-color 0.12s ease',
                }}
              >
                הוסף סוג חדש של אירוע +
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ── Save button ── */}
      <div style={{ padding: '12px 24px 44px', flexShrink: 0 }}>
        <button
          disabled={!hasTypes}
          onClick={() => hasTypes && onSave({ types: [...selectedTypes] })}
          {...(hasTypes ? press('save') : {})}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 30,
            border: hasTypes ? 'none' : '1.5px solid #45423A',
            background: hasTypes
              ? (pressed === 'save' ? '#2E2B25' : '#45423A')
              : 'transparent',
            color: hasTypes ? '#F8F5EE' : '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 17,
            cursor: hasTypes ? 'pointer' : 'default',
            transform: pressed === 'save' ? 'scale(0.97)' : 'scale(1)',
            transition: hasTypes ? 'background 0.12s ease, transform 0.12s ease' : 'none',
          }}
        >
          {isFemale ? 'תעדי את האירוע' : 'תעד את האירוע'}
        </button>
      </div>

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
