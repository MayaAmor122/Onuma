import { useState, useEffect, useRef } from 'react';
import Mandala from '../components/Mandala';
import { useApp } from '../context/AppContext';

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
function ChevronLeftIcon({ color = '#323232' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function ChevronUpIcon({ color = '#323232' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  );
}

/* Location color cycle — repeats from blue after the 5th location */
const LOCATION_COLORS = ['#183497', '#B6CDFF', '#FFC8CE', '#00BE4A', '#FFDB60'];
function colorForIndex(i) { return LOCATION_COLORS[i % LOCATION_COLORS.length]; }

const TRIGGER_H = 48;
const BOTTOM_PAD = 25;
const CARD_GAP = 6;

function LocationOption({ loc, idx, selected, pressed, press, onSelect }) {
  const isSelected = selected === loc;
  const optId = `opt_${loc}`;
  return (
    <button
      onClick={() => onSelect(loc)}
      {...press(optId)}
      style={{
        width: '100%', height: 48, border: 'none', borderRadius: 24,
        background: pressed === optId ? 'rgba(24,52,151,0.10)' : isSelected ? '#EBE8DB' : 'transparent',
        display: 'flex', flexDirection: 'row', direction: 'rtl',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingRight: 18, gap: 10,
        cursor: 'pointer', boxSizing: 'border-box',
        transform: pressed === optId ? 'scale(0.97)' : 'scale(1)',
        transition: 'background 0.12s ease, transform 0.12s ease',
      }}
    >
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: colorForIndex(idx), flexShrink: 0 }} />
      <span style={{ fontFamily: 'Atlas', fontWeight: isSelected ? 700 : 500, fontSize: 14, color: '#323232' }}>
        {loc}
      </span>
    </button>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function AddEventScreen3({ onNext, onBack, onClose, timeOfDay = 'morning', rating = 3 }) {
  const { gender } = useApp();
  const isFemale = gender === 'female';
  const [locations,        setLocations]       = useState(() => {
    try {
      const saved = localStorage.getItem('onuma_locations');
      return saved ? JSON.parse(saved) : ['בית', 'עבודה'];
    } catch { return ['בית', 'עבודה']; }
  });
  const [locationCounts,   setLocationCounts]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('onuma_location_counts') || '{}'); }
    catch { return {}; }
  });
  const [selectedLocation, setSelectedLocation] = useState('בית');
  const [isOpen,            setIsOpen]          = useState(false);
  const [dropVisible,       setDropVisible]     = useState(false);
  const [confirmed,         setConfirmed]       = useState(false);
  const [addingCustom,      setAddingCustom]    = useState(false);
  const [customText,        setCustomText]      = useState('');
  const [pressed,           setPressed]         = useState(null);
  const inputRef = useRef(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  useEffect(() => {
    localStorage.setItem('onuma_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('onuma_location_counts', JSON.stringify(locationCounts));
  }, [locationCounts]);

  const selectedIndex = locations.indexOf(selectedLocation);
  const selectedColor = colorForIndex(selectedIndex === -1 ? 0 : selectedIndex);
  const nextColor      = colorForIndex(locations.length);

  function openDropdown() {
    setIsOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setDropVisible(true)));
  }

  function closeDropdown() {
    setDropVisible(false);
    setTimeout(() => setIsOpen(false), 200);
  }

  function selectLocation(loc) {
    setSelectedLocation(loc);
    setConfirmed(true);
    setLocationCounts(prev => ({ ...prev, [loc]: (prev[loc] || 0) + 1 }));
    closeDropdown();
  }

  function confirmCustom() {
    const trimmed = customText.trim();
    if (trimmed) {
      if (!locations.includes(trimmed)) setLocations(prev => [...prev, trimmed]);
      setLocationCounts(prev => ({ ...prev, [trimmed]: (prev[trimmed] || 0) + 1 }));
      setSelectedLocation(trimmed);
      setConfirmed(true);
    }
    setCustomText('');
    setAddingCustom(false);
    closeDropdown();
  }

  /* ── Section logic: show headers when 3+ locations and at least one used 2+ times ── */
  const showSections = locations.length >= 3 && locations.some(l => (locationCounts[l] || 0) >= 2);
  const commonLocs   = showSections ? locations.filter(l => (locationCounts[l] || 0) >= 2) : [];
  const otherLocs    = showSections ? locations.filter(l => (locationCounts[l] || 0) < 2)  : locations;

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

        {/* 4-step indicator — step 3 active */}
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, height: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 6 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 8, width: i === 2 ? 24 : 8, borderRadius: 4,
                background: i === 2 ? '#323232' : 'rgba(50,50,50,0.25)',
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
        {isFemale ? 'בחרי איפה האירוע התרחש?' : 'בחר איפה האירוע התרחש?'}
      </p>

      {/* ── Mandala preview + dropdown — mandala stays fixed, dropdown overlays on top ── */}
      <div style={{ flex: 1, position: 'relative' }}>

        {/* Mandala — tappable to toggle dropdown */}
        <div
          onClick={() => isOpen ? closeDropdown() : openDropdown()}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'translateY(-26px)',
            cursor: 'pointer',
          }}
        >
          <Mandala timeOfDay={timeOfDay} intensity={rating} color={selectedColor} size={343.46} />
        </div>

        {/* Options card — animates in/out */}
        {isOpen && (
          <div style={{
            position: 'absolute', left: 24, right: 24,
            bottom: BOTTOM_PAD + TRIGGER_H + CARD_GAP,
            border: '1px solid #E2DFD0', borderRadius: 30,
            background: '#F8F5EE', padding: 8,
            display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
            opacity: dropVisible ? 1 : 0,
            transform: dropVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.32,0.72,0,1)',
          }}>
            {(showSections ? (
              <>
                {commonLocs.length > 0 && <>
                  <div style={{ padding: '10px 18px 2px', fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#87837A', direction: 'rtl' }}>מיקומים נפוצים</div>
                  {commonLocs.map(loc => <LocationOption key={loc} loc={loc} idx={locations.indexOf(loc)} selected={selectedLocation} pressed={pressed} press={press} onSelect={selectLocation} />)}
                </>}
                {otherLocs.length > 0 && <>
                  <div style={{ height: 1, background: '#E2DFD0', margin: '8px 10px 0' }} />
                  <div style={{ padding: '12px 18px 2px', fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#87837A', direction: 'rtl' }}>כל שאר המיקומים</div>
                  {otherLocs.map(loc => <LocationOption key={loc} loc={loc} idx={locations.indexOf(loc)} selected={selectedLocation} pressed={pressed} press={press} onSelect={selectLocation} />)}
                </>}
              </>
            ) : locations.map((loc, idx) => (
              <LocationOption key={loc} loc={loc} idx={idx} selected={selectedLocation} pressed={pressed} press={press} onSelect={selectLocation} />
            )))}

            {/* Add new location row — or live input when active */}
            {addingCustom ? (
              <div style={{ display: 'flex', alignItems: 'center', height: 48, paddingLeft: 8 }}>
                <button
                  onClick={confirmCustom}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: customText.trim() ? '#45423A' : '#C4C1B8',
                    border: 'none', cursor: customText.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
                <input
                  ref={inputRef}
                  autoFocus
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') confirmCustom(); }}
                  placeholder={isFemale ? 'הקלידי מיקום חדש...' : 'הקלד מיקום חדש...'}
                  style={{
                    flex: 1, height: '100%', borderRadius: 24,
                    border: 'none', background: 'transparent',
                    color: '#323232', caretColor: '#323232',
                    fontFamily: 'Atlas', fontWeight: 500, fontSize: 14,
                    textAlign: 'right', direction: 'rtl',
                    padding: '0 12px 0 8px', boxSizing: 'border-box', outline: 'none',
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setAddingCustom(true)}
                {...press('add_loc')}
                style={{
                  width: '100%', height: 48, border: 'none',
                  background: pressed === 'add_loc' ? 'rgba(24,52,151,0.08)' : 'transparent',
                  borderRadius: 24,
                  display: 'flex', flexDirection: 'row', direction: 'rtl',
                  alignItems: 'center', justifyContent: 'flex-start',
                  paddingRight: 18, gap: 10,
                  cursor: 'pointer', boxSizing: 'border-box',
                  transform: pressed === 'add_loc' ? 'scale(0.97)' : 'scale(1)',
                  transition: 'background 0.12s ease, transform 0.12s ease',
                }}
              >
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: nextColor, flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#323232' }}>
                  הוסף מיקום חדש +
                </span>
              </button>
            )}
          </div>
        )}

        {/* Trigger — fixed position, azure when closed, neutral when open */}
        <button
          onClick={() => isOpen ? closeDropdown() : openDropdown()}
          {...press('trigger')}
          style={{
            position: 'absolute', left: 24, right: 24, bottom: BOTTOM_PAD,
            height: TRIGGER_H, padding: '0 20px', borderRadius: 24,
            border: '1.5px solid #45423A',
            background: pressed === 'trigger' ? 'rgba(69,66,58,0.08)' : 'transparent',
            display: 'flex', flexDirection: 'row', direction: 'rtl',
            alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', boxSizing: 'border-box',
            transform: pressed === 'trigger' ? 'scale(0.98)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
          }}
        >
          <span style={{
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 14,
            color: '#45423A',
          }}>
            {selectedLocation}
          </span>
          {isOpen ? <ChevronUpIcon color="#45423A" /> : <ChevronLeftIcon color="#45423A" />}
        </button>
      </div>

      {/* ── Continue button — W-140, aligned left ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 24px 44px' }}>
        <button
          disabled={!confirmed}
          onClick={() => confirmed && onNext({ location: selectedLocation, color: selectedColor })}
          {...(confirmed ? press('next') : {})}
          style={{
            width: 140, padding: '16px 0', borderRadius: 30,
            border: confirmed ? 'none' : '1.5px solid #45423A',
            background: confirmed
              ? (pressed === 'next' ? '#2E2B25' : '#45423A')
              : 'transparent',
            color: confirmed ? '#F8F5EE' : '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 17,
            cursor: confirmed ? 'pointer' : 'default',
            transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
            transition: confirmed ? 'background 0.12s ease, transform 0.12s ease' : 'none',
          }}
        >
          {isFemale ? 'המשיכי' : 'המשך'}
        </button>
      </div>

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
