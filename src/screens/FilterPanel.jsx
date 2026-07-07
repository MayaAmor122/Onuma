import { useState } from 'react';
import { getTimeOfDay } from '../components/Mandala';

/* ── Static filter options ── */
const TIME_OPTIONS = [
  { id: 'morning',   label: 'בוקר'        },
  { id: 'noon',      label: 'צהריים'      },
  { id: 'afternoon', label: 'אחר הצהריים' },
  { id: 'evening',   label: 'ערב'         },
  { id: 'night',     label: 'לילה'        },
];

const DEFAULT_LOCATIONS = ['בית', 'עבודה'];

const DEFAULT_TYPES = [
  'ניקיון', 'הסתרה',
  'מחשבה טורדנית', 'בדיקה',
  'ספירה', 'חזרתיות',
  'הימנעות', 'ארגון',
  'סידור', 'צורך בוודאות',
  'החלטה או בחירה', 'אישור',
];

/* ── Icons ── */
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  );
}

/* ── Chip component ── */
function Chip({ label, selected, onPress }) {
  const [chipPressed, setChipPressed] = useState(false);
  return (
    <button
      onClick={onPress}
      onPointerDown={() => setChipPressed(true)}
      onPointerUp={() => setChipPressed(false)}
      onPointerLeave={() => setChipPressed(false)}
      style={{
        width: 108, height: 36, borderRadius: 30,
        border: selected ? 'none' : '1.5px solid #D4D1C3',
        background: selected
          ? (chipPressed ? '#0F2472' : '#183497')
          : (chipPressed ? 'rgba(24,52,151,0.06)' : 'transparent'),
        color: selected ? '#ffffff' : '#323232',
        fontFamily: 'Atlas', fontWeight: selected ? 500 : 400, fontSize: 12,
        cursor: 'pointer', boxSizing: 'border-box', whiteSpace: 'nowrap', flexShrink: 0,
        transform: chipPressed ? 'scale(0.96)' : 'scale(1)',
        transition: 'background 0.12s ease, transform 0.12s ease',
      }}
    >
      {label}
    </button>
  );
}

/* ── Section wrapper ── */
function FilterSection({ label, children, noBorder }) {
  return (
    <div>
      {!noBorder && <div style={{ height: 1, background: '#E2DFD0', margin: '0 0 20px' }} />}
      <p style={{
        fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#45423A',
        textAlign: 'right', margin: '0 0 18px',
      }}>
        {label}
      </p>
      {children}
      <div style={{ height: 36 }} />
    </div>
  );
}

/* ════════════════════════════════
   FilterPanel
════════════════════════════════ */
export default function FilterPanel({ events, currentFilter, onApply, onClose, visible = false }) {
  const [timesOfDay, setTimesOfDay] = useState([...(currentFilter.timesOfDay || [])]);
  const [locations,  setLocations]  = useState([...currentFilter.locations]);
  const [ratings,    setRatings]    = useState([...(currentFilter.ratings || [])]);
  const [types,      setTypes]      = useState([...currentFilter.types]);

  /* Locations: saved list (persisted across sessions) + any from events not yet in the list */
  const savedLocations = (() => {
    try { return JSON.parse(localStorage.getItem('onuma_locations') || 'null') || DEFAULT_LOCATIONS; }
    catch { return DEFAULT_LOCATIONS; }
  })();
  const eventLocations = events.map(e => e.location).filter(Boolean);
  const allLocations   = [...new Set([...savedLocations, ...eventLocations])];

  /* Types: full default list + any custom types added via events */
  const eventTypes = events.flatMap(e => e.types || []);
  const allTypes   = [...new Set([...DEFAULT_TYPES, ...eventTypes])];

  const selCount = timesOfDay.length + locations.length + ratings.length + types.length;
  const hasSelection = selCount > 0;

  /* Summary label text */
  function buildSummary() {
    const parts = [
      ...timesOfDay.map(id => TIME_OPTIONS.find(o => o.id === id)?.label || id),
      ...ratings.map(r => `עוצמה ${r}`),
      ...locations,
      ...types,
    ];
    return parts.join(' | ');
  }

  /* Toggles */
  function toggleTime(id)      { setTimesOfDay(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); }
  function toggleLocation(l)   { setLocations(p => p.includes(l)  ? p.filter(x => x !== l)  : [...p, l]);  }
  function toggleRating(r)     { setRatings(p => p.includes(r)    ? p.filter(x => x !== r)   : [...p, r]);  }
  function toggleType(t)       { setTypes(p => p.includes(t)      ? p.filter(x => x !== t)   : [...p, t]);  }

  function handleClear()  { setTimesOfDay([]); setLocations([]); setRatings([]); setTypes([]); }
  function handleApply()  { onApply({ timesOfDay, locations, ratings, types }); onClose(); }

  /* Pressed states for bottom buttons */
  const [btnPressed, setBtnPressed] = useState(null);
  const press = id => ({
    onPointerDown: () => setBtnPressed(id),
    onPointerUp:   () => setBtnPressed(null),
    onPointerLeave:() => setBtnPressed(null),
  });

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: '#F8F5EE', display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      transform: visible ? 'translateY(0%)' : 'translateY(100%)',
      transition: 'transform 0.34s cubic-bezier(0.32,0.72,0,1)',
    }}>

      {/* ── Top bar: X ── */}
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={onClose} style={iconBtn}><CloseIcon /></button>
      </div>

      {/* ── Title + subtitle ── */}
      <div style={{ padding: '16px 24px 32px', textAlign: 'right', direction: 'rtl' }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A', margin: 0,
        }}>
          סנן לפי
        </p>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A', margin: '4px 0 0',
        }}>
          ניתן לבחור יותר מאופציה אחת
        </p>
      </div>

      {/* ── Scrollable sections with bottom fade ── */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1, overflowY: 'auto',
          padding: '0 24px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
          maskImage:       'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
          direction: 'rtl',
        }}
      >
        {/* Time of day */}
        <FilterSection label="הזמן ביום שבו התרחש האירוע" noBorder>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, direction: 'rtl' }}>
            {TIME_OPTIONS.map(({ id, label }) => (
              <Chip key={id} label={label} selected={timesOfDay.includes(id)} onPress={() => toggleTime(id)} />
            ))}
          </div>
        </FilterSection>

        {/* Location */}
        {allLocations.length > 0 && (
          <FilterSection label="המרחב בו האירוע התרחש">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, direction: 'rtl' }}>
              {allLocations.map(l => (
                <Chip key={l} label={l} selected={locations.includes(l)} onPress={() => toggleLocation(l)} />
              ))}
            </div>
          </FilterSection>
        )}

        {/* Intensity */}
        <FilterSection label="עוצמה">
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(r => {
              const sel = ratings.includes(r);
              return (
                <button
                  key={r}
                  onClick={() => toggleRating(r)}
                  style={{
                    width: 63, height: 36, borderRadius: 30, flexShrink: 0,
                    background: sel ? '#183497' : 'transparent',
                    border: `1.5px solid ${sel ? '#183497' : '#D4D1C3'}`,
                    color: sel ? '#ffffff' : '#323232',
                    fontFamily: 'Atlas', fontWeight: 500, fontSize: 12,
                    cursor: 'pointer', boxSizing: 'border-box',
                    transition: 'background 0.12s ease, border-color 0.12s ease',
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Event type */}
        {allTypes.length > 0 && (
          <FilterSection label="סוג האירוע">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, direction: 'rtl' }}>
              {allTypes.map(t => (
                <Chip key={t} label={t} selected={types.includes(t)} onPress={() => toggleType(t)} />
              ))}
            </div>
          </FilterSection>
        )}

        <div style={{ height: 32 }} />
      </div>

      {/* ── Summary indicator (shown when something is selected) ── */}
      {hasSelection && (
        <div style={{
          margin: '8px 19px 0',
          height: 93, boxSizing: 'border-box',
          background: '#F8F5EE', borderRadius: 14,
          border: '1px solid #E2DFD0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          padding: '0 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'rtl',
          flexShrink: 0, overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#87837A',
            margin: '0 0 3px',
          }}>
            נבחרו {selCount} פריטים
          </p>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 16, color: '#183497',
            margin: 0, lineHeight: 1.4,
          }}>
            {buildSummary()}
          </p>
        </div>
      )}

      {/* ── Bottom bar: הצג (left) · נקה בחירה (right) ── */}
      <div style={{
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px 44px', flexShrink: 0,
      }}>
        {/* הצג — left */}
        <button
          onClick={handleApply}
          {...press('apply')}
          style={{
            width: 169, height: 56, borderRadius: 30,
            background: hasSelection
              ? (btnPressed === 'apply' ? '#2E2B25' : '#45423A')
              : 'transparent',
            border: hasSelection ? 'none' : '1.5px solid #45423A',
            color: hasSelection ? '#F8F5EE' : '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 16,
            cursor: 'pointer',
            transform: btnPressed === 'apply' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
          }}
        >
          {hasSelection ? `הצג תוצאות (${selCount})` : 'הצג'}
        </button>

        {/* נקה בחירה — right */}
        <span
          onClick={handleClear}
          {...press('clear')}
          style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A',
            cursor: 'pointer',
            opacity: btnPressed === 'clear' ? 0.5 : 1,
            transition: 'opacity 0.12s ease',
          }}
        >
          נקה בחירה
        </span>
      </div>

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
