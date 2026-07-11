import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import FilterPanel from './FilterPanel';
import Mandala, { getTimeOfDay } from '../components/Mandala';

/* ── Hebrew helpers ── */
const MONTHS_HE = [
  'ינואר','פברואר','מרץ','אפריל','מאי','יוני',
  'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר',
];
function formatEventDate(ts) {
  const d = new Date(ts);
  return `${d.getDate()} ב${MONTHS_HE[d.getMonth()]}, ${d.getFullYear()}`;
}
function formatMonthYear() {
  const d = new Date();
  return `${MONTHS_HE[d.getMonth()]} ${d.getFullYear()}`;
}

/* ── Zoom level configs ── */
const LEVELS = [
  { cols: 4,  dotSize: 88.25, gap: 0, view: 'הכל'  },
  { cols: 9,  dotSize: 34,    gap: 6, view: 'חודש' },
  { cols: 18, dotSize: 17,    gap: 3, view: 'שנה'  },
];
const MIN_GRID_CELLS = 64; // keeps the level-0 grid feeling like a long scrollable gallery

/* ── Filter helpers ── */
const EMPTY_FILTER = { timesOfDay: [], locations: [], ratings: [], types: [] };

function isFilterActive(f) {
  return f.timesOfDay.length > 0 || f.locations.length > 0 || f.ratings.length > 0 || f.types.length > 0;
}
function eventMatchesFilter(event, f) {
  if (!isFilterActive(f)) return true;
  const timeMatch     = f.timesOfDay.length === 0 || f.timesOfDay.includes(getTimeOfDay(event.timestamp));
  const locationMatch = f.locations.length === 0  || f.locations.includes(event.location);
  const ratingMatch   = f.ratings.length === 0    || f.ratings.includes(event.rating || 1);
  const typeMatch     = f.types.length === 0
    || (event.types && event.types.some(t => f.types.includes(t)));
  return timeMatch && locationMatch && ratingMatch && typeMatch;
}

/* ── Chart data ── */
function getChartBuckets(events, level, filter) {
  const visible = isFilterActive(filter)
    ? events.filter(e => eventMatchesFilter(e, filter))
    : events;

  if (level === 2) {
    const yr  = new Date().getFullYear();
    const cur = new Date().getMonth();
    const relevant = visible.filter(e => new Date(e.timestamp).getFullYear() === yr);
    const counts = Array(cur + 1).fill(0);
    relevant.forEach(e => {
      const m = new Date(e.timestamp).getMonth();
      if (m <= cur) counts[m]++;
    });
    return counts.map((count, i) => ({ label: MONTHS_HE[i].slice(0, 3), count }));
  }
  if (level === 1) {
    const now = new Date();
    const yr = now.getFullYear(); const mo = now.getMonth();
    const relevant = visible.filter(e => {
      const d = new Date(e.timestamp);
      return d.getFullYear() === yr && d.getMonth() === mo;
    });
    const counts = {};
    relevant.forEach(e => { const d = new Date(e.timestamp).getDate(); counts[d] = (counts[d]||0)+1; });
    return Object.entries(counts).sort(([a],[b]) => +a - +b).map(([d, count]) => ({ label: String(d), count }));
  }
  const dateMap = new Map();
  visible.forEach(e => {
    const d = new Date(e.timestamp);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    dateMap.set(key, { label: String(d.getDate()), count: (dateMap.get(key)?.count||0)+1, time: d.getTime() });
  });
  return [...dateMap.values()].sort((a,b) => a.time - b.time).slice(-7).map(({label,count}) => ({label,count}));
}

/* ── Pattern finder ── */
function findPattern(selectedEvents) {
  const insights = [];
  const n = selectedEvents.length;
  if (n === 0) return ['לא נבחרו אירועים'];

  // 1. Location
  const locs = selectedEvents.map(e => e.location).filter(Boolean);
  if (locs.length > 0) {
    const lc = {};
    locs.forEach(l => lc[l] = (lc[l]||0)+1);
    const [topLoc, topCnt] = Object.entries(lc).sort(([,a],[,b]) => b-a)[0];
    if (topCnt === n)               insights.push(`כולם התרחשו ב${topLoc}`);
    else if (topCnt >= Math.ceil(n * 0.5)) insights.push(`${topCnt} מתוך ${n} התרחשו ב${topLoc}`);
  }

  // 2. Time of day
  const slot = ts => { const h = new Date(ts).getHours(); return h<12?'בוקר':h<17?'צהריים':h<21?'ערב':'לילה'; };
  const times = selectedEvents.map(e => slot(e.timestamp));
  const tc = {};
  times.forEach(t => tc[t]=(tc[t]||0)+1);
  const [topTime, topTimeCnt] = Object.entries(tc).sort(([,a],[,b]) => b-a)[0];
  if (topTimeCnt === n)                   insights.push(`כולם התרחשו בשעות ה${topTime}`);
  else if (topTimeCnt >= Math.ceil(n*0.5)) insights.push(`${topTimeCnt} מתוך ${n} התרחשו בשעות ה${topTime}`);

  // 3. Intensity
  const ratings = selectedEvents.map(e => e.rating||1);
  if      (ratings.every(r => r >= 4)) insights.push('כולם סומנו בעוצמה 4 ומעלה');
  else if (ratings.every(r => r >= 3)) insights.push('כולם סומנו בעוצמה 3 ומעלה');
  else {
    const avg = ratings.reduce((a,b) => a+b, 0) / n;
    if (avg >= 3) insights.push(`ממוצע העוצמה הוא ${avg.toFixed(1)}`);
  }

  // 4. Type
  const allTypes = selectedEvents.flatMap(e => e.types||[]);
  if (allTypes.length > 0) {
    const tyc = {};
    allTypes.forEach(t => tyc[t]=(tyc[t]||0)+1);
    const [topType, topTypeCnt] = Object.entries(tyc).sort(([,a],[,b]) => b-a)[0];
    if (topTypeCnt === n)                    insights.push(`כולם קשורים ל${topType}`);
    else if (topTypeCnt >= Math.ceil(n*0.5)) insights.push(`${topTypeCnt} מתוך ${n} קשורים ל${topType}`);
  }

  if (insights.length === 0) insights.push('לא נמצאו דפוסים ברורים בין האירועים הנבחרים');
  return insights.slice(0, 3);
}

function computePatternData(selected) {
  const n = selected.length;
  if (n === 0) return null;

  const mode = arr => Object.entries(arr.reduce((acc, v) => { acc[v] = (acc[v]||0)+1; return acc; }, {})).sort(([,a],[,b])=>b-a)[0];

  const timeBuckets = selected.map(e => getTimeOfDay(e.timestamp));
  const [domTime, domTimeCnt] = mode(timeBuckets);

  const timeHe = { morning: 'בוקר', noon: 'צהריים', afternoon: 'אחה"צ', evening: 'ערב', night: 'לילה' };

  const locs = selected.map(e => e.location).filter(Boolean);
  const [domLoc, domLocCnt] = locs.length ? mode(locs) : [null, 0];

  const avgRating = Math.round(selected.reduce((s, e) => s + (e.rating||1), 0) / n);

  const allTypes = selected.flatMap(e => e.types||[]);
  const topTypes = allTypes.length
    ? Object.entries(allTypes.reduce((acc, t) => { acc[t]=(acc[t]||0)+1; return acc; }, {})).sort(([,a],[,b])=>b-a).slice(0,2).map(([t])=>t)
    : [];

  const colors = selected.map(e => e.color).filter(Boolean);
  const [domColor] = colors.length ? mode(colors) : ['#183497'];

  return {
    mandala: { timeOfDay: domTime, intensity: avgRating, color: domColor },
    location: { value: domLoc, count: domLocCnt, total: n },
    time: { value: timeHe[domTime]||domTime, count: domTimeCnt, total: n },
    intensity: { value: avgRating },
    types: { value: topTypes.join(', ') || '—' },
  };
}

/* ── Icons ── */
function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#183497" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2.5h6a1 1 0 0 1 1 1V4h2a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2v-.5a1 1 0 0 1 1-1z"/>
      <rect x="9" y="2.5" width="6" height="3" rx="0.5"/>
      <line x1="8" y1="11" x2="16" y2="11"/>
      <line x1="8" y1="15" x2="13" y2="15"/>
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function PlusIcon({ color = '#183497', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function InsightsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8"  y1="2" x2="8"  y2="6"/>
      <line x1="3"  y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function CloseIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6"  y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.5L3.2 5.5L8 1" stroke="white" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function Spinner() {
  return (
    <div style={{
      width: 15, height: 15, borderRadius: '50%', flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.35)',
      borderTopColor: '#ffffff',
      animation: 'spin 0.75s linear infinite',
    }} />
  );
}
function ActiveDot() {
  return (
    <div style={{
      width: 6, height: 6, borderRadius: '50%',
      background: '#ffffff', marginLeft: 5, flexShrink: 0,
    }} />
  );
}

/* ── Report saved confirmation modal ── */
function ReportConfirmModal({ onGoReport, onGoHome }) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      background: 'rgba(28,28,28,0.63)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease',
    }}>
      <div style={{
        width: 280, borderRadius: 18, background: '#F8F5EE',
        border: '1px solid #E2DFD0',
        boxSizing: 'border-box', padding: '28px 22px 22px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
        direction: 'rtl',
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: 'transform 0.2s cubic-bezier(0.32,0.72,0,1)',
      }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 14,
          color: '#45423A', textAlign: 'center', margin: 0, lineHeight: '20px', whiteSpace: 'pre-line',
        }}>
          {'הקשר נשמר בסיכום התקופתי שלך.\nניתן למצוא אותו בדו״חות'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, direction: 'ltr', width: '100%' }}>
          <button onClick={onGoReport} {...press('report')} style={{
            flex: 1, padding: '10px 0', borderRadius: 30, border: 'none',
            background: pressed === 'report' ? '#2E2B25' : '#45423A', color: '#F8F5EE',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            transform: pressed === 'report' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
          }}>עבור לדו״ח</button>
          <button onClick={onGoHome} {...press('home')} style={{
            flex: 1, padding: '10px 0', borderRadius: 30,
            background: pressed === 'home' ? 'rgba(69,66,58,0.08)' : 'transparent',
            border: '1.5px solid', borderColor: pressed === 'home' ? '#2E2B25' : '#45423A',
            color: '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            transform: pressed === 'home' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease, border-color 0.12s ease',
          }}>חזור לאירועים</button>
        </div>
      </div>
    </div>
  );
}

/* ── No-results modal ── */
function NoResultsModal({ onChangeFilter, onClear }) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(null);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      background: 'rgba(28,28,28,0.63)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease',
    }}>
      <div style={{
        width: 280, borderRadius: 18, background: '#F8F5EE',
        border: '1px solid #E2DFD0',
        boxSizing: 'border-box', padding: '28px 22px 22px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
        direction: 'rtl',
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: 'transform 0.2s cubic-bezier(0.32,0.72,0,1)',
      }}>
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 14,
          color: '#45423A', textAlign: 'center', margin: 0, lineHeight: '17px', whiteSpace: 'pre-line',
        }}>
          {'לא נמצאו אירועים עם\nהפילטרים שנבחרו..'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, direction: 'ltr', width: '100%' }}>
          <button onClick={onChangeFilter} {...press('change')} style={{
            flex: 1, padding: '10px 0', borderRadius: 30, border: 'none',
            background: pressed === 'change' ? '#2E2B25' : '#45423A', color: '#F8F5EE',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            transform: pressed === 'change' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease',
          }}>שנה את הסינון</button>
          <button onClick={onClear} {...press('clear')} style={{
            flex: 1, padding: '10px 0', borderRadius: 30,
            background: pressed === 'clear' ? 'rgba(69,66,58,0.08)' : 'transparent',
            border: '1.5px solid', borderColor: pressed === 'clear' ? '#2E2B25' : '#45423A',
            color: '#45423A',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            transform: pressed === 'clear' ? 'scale(0.97)' : 'scale(1)',
            transition: 'background 0.12s ease, transform 0.12s ease, border-color 0.12s ease',
          }}>לאירועים שלי</button>
        </div>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  { id: 'profile',       label: 'החשבון שלי', Icon: ProfileIcon  },
  { id: 'reports',       label: 'דו"חות',     Icon: DocumentIcon },
  { id: 'notifications', label: 'התראות',     Icon: BellIcon     },
  { id: 'settings',      label: 'הגדרות',     Icon: GearIcon     },
];

/* ── Empty mandala for no-result state ── */
function EmptyMandala({ size }) {
  const rings = [
    { r: 58.36, dotR: 10.80, count:  9 },
    { r: 38.43, dotR:  5.12, count: 18 },
    { r: 26.28, dotR:  3.50, count: 18 },
    { r: 17.44, dotR:  2.32, count: 21 },
    { r: 10.07, dotR:  1.34, count: 26 },
  ];
  return (
    <svg width={size} height={size} viewBox="-70 -70 140 140">
      {rings.map(({ r, dotR, count }, ri) =>
        Array.from({ length: count }, (_, i) => {
          const a = (-Math.PI / 2) + (2 * Math.PI / count) * i;
          return <circle key={`${ri}-${i}`} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={dotR} fill="#E7E4D4" />;
        })
      )}
    </svg>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function HomeScreen({
  onNavigate, onAddEvent, onEventPress, previewEvents, addButtonRef, addButtonBg, addButtonBorderColor, addButtonIconColor, initialLevel,
  dotRefCallback, hideIndices, newEventId, onNewEventAnimated,
}) {
  const { events: contextEvents } = useApp();
  const events     = previewEvents || contextEvents;
  const hasEvents  = events.length > 0;

  /* ── View state ── */
  const [level,           setLevel]           = useState(initialLevel ?? 0);
  const [viewMode,        setViewMode]        = useState('grid');
  const [showFilterPanel,    setShowFilterPanel]    = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [showMenu,        setShowMenu]        = useState(false);
  const [menuVisible,     setMenuVisible]     = useState(false);
  const [menuPressed,     setMenuPressed]     = useState(null);
  const [filter,          setFilter]          = useState(EMPTY_FILTER);
  const [showNoResults,      setShowNoResults]      = useState(false);
  const [showReportConfirm,  setShowReportConfirm]  = useState(false);

  function applyFilter(f) {
    setFilter(f);
    const hasMatches = events.some(e => eventMatchesFilter(e, f));
    if (isFilterActive(f) && !hasMatches) setShowNoResults(true);
  }

  function openFilterPanel() {
    setShowFilterPanel(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setFilterPanelVisible(true)));
  }
  function closeFilterPanel() {
    setFilterPanelVisible(false);
    setTimeout(() => setShowFilterPanel(false), 360);
  }

  function openMenu() {
    setShowMenu(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  }
  function closeMenu() {
    setMenuVisible(false);
    setTimeout(() => setShowMenu(false), 220);
  }

  /* ── Empty-state button press ── */
  const [emptyBtnPressed, setEmptyBtnPressed] = useState(false);

  /* ── Selection state ── */
  const [selectedEventIds,  setSelectedEventIds]  = useState(() => new Set());
  const [lastSelectedEvent, setLastSelectedEvent] = useState(null);
  const [sheet,             setSheet]             = useState(null); // null|'preview'|'summary'|'loading'|'result'
  const [patternInsights,   setPatternInsights]   = useState([]);
  const [patternData,       setPatternData]       = useState(null);

  /* ── Refs ── */
  const gridAreaRef        = useRef(null);
  const levelRef           = useRef(0);
  const longPressTimerRef  = useRef(null);
  const summaryTimerRef    = useRef(null);
  const isLongPressRef     = useRef(false);
  const selectedIdsRef     = useRef(new Set()); // stale-closure-safe mirror

  /* ── Pinch visual state ── */
  const [pinchScale,  setPinchScale]  = useState(1);
  const [isPinching,  setIsPinching]  = useState(false);
  const pinchScaleRef = useRef(1);

  const { cols, dotSize, gap, view: activeView } = LEVELS[level];
  const filterActive = isFilterActive(filter);
  const filterCount  = filter.timesOfDay.length + filter.locations.length + filter.ratings.length + filter.types.length;

  /* Keep selectedIdsRef in sync */
  useEffect(() => { selectedIdsRef.current = selectedEventIds; }, [selectedEventIds]);
  useEffect(() => { levelRef.current = level; }, [level]);

  /* Clear the new-event flag once its pop-in animation has played */
  useEffect(() => {
    if (!newEventId || !onNewEventAnimated) return;
    const t = setTimeout(onNewEventAnimated, 1400);
    return () => clearTimeout(t);
  }, [newEventId, onNewEventAnimated]);

  /* Scroll "+" button into view after a new event is saved */
  useEffect(() => {
    if (!newEventId || !addButtonRef?.current) return;
    const t = setTimeout(() => {
      addButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
    return () => clearTimeout(t);
  }, [newEventId]);

  /* Cleanup timers on unmount */
  useEffect(() => () => {
    clearTimeout(longPressTimerRef.current);
    clearTimeout(summaryTimerRef.current);
  }, []);

  /* ── Pinch-to-zoom ── */
  useEffect(() => {
    const el = gridAreaRef.current;
    if (!el) return;
    const pinch = { active: false, startDist: 0, startLevel: 0 };
    function dist(t) {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx*dx + dy*dy);
    }
    function onStart(e) {
      if (e.touches.length === 2) {
        pinch.active = true;
        pinch.startDist = dist(e.touches);
        pinch.startLevel = levelRef.current;
        setIsPinching(true);
      } else {
        pinch.active = false;
      }
    }
    function onMove(e) {
      if (!pinch.active || e.touches.length !== 2) return;
      e.preventDefault();
      const s = Math.max(0.4, Math.min(2.4, dist(e.touches) / pinch.startDist));
      pinchScaleRef.current = s;
      setPinchScale(s);
    }
    function onEnd() {
      if (!pinch.active) return;
      pinch.active = false;
      const s = pinchScaleRef.current;
      const cur = levelRef.current;
      if      (s < 0.75 && cur < 2) setLevel(cur + 1);
      else if (s > 1.35 && cur > 0) setLevel(cur - 1);
      pinchScaleRef.current = 1;
      setPinchScale(1);
      setIsPinching(false);
    }
    el.addEventListener('touchstart', onStart, { passive: true  });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd,   { passive: true  });
    el.addEventListener('touchcancel',onEnd,   { passive: true  });
    return () => {
      el.removeEventListener('touchstart',  onStart);
      el.removeEventListener('touchmove',   onMove);
      el.removeEventListener('touchend',    onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, []);

  /* ── Selection helpers ── */
  function enterSelectionToggle(eventObj) {
    clearTimeout(summaryTimerRef.current);

    const next = new Set(selectedIdsRef.current);
    if (next.has(eventObj.id)) next.delete(eventObj.id);
    else                       next.add(eventObj.id);

    selectedIdsRef.current = next;
    setSelectedEventIds(new Set(next));

    if (next.size === 0) {
      setSheet(null);
      setLastSelectedEvent(null);
      return;
    }

    setLastSelectedEvent(eventObj);
    setSheet('preview');

    /* Auto-advance preview → summary after 2s of inactivity */
    summaryTimerRef.current = setTimeout(() => {
      setSheet(s => s === 'preview' ? 'summary' : s);
    }, 2000);
  }

  function clearSelection() {
    clearTimeout(summaryTimerRef.current);
    selectedIdsRef.current = new Set();
    setSelectedEventIds(new Set());
    setLastSelectedEvent(null);
    setSheet(null);
    setPatternInsights([]);
    setPatternData(null);
  }

  function handleFindPattern() {
    setSheet('loading');
    const selected = events.filter(e => selectedIdsRef.current.has(e.id));
    setTimeout(() => {
      const insights = findPattern(selected);
      const data     = computePatternData(selected);
      const hasPattern = insights.length > 0 && insights[0] !== 'לא נמצאו דפוסים ברורים בין האירועים הנבחרים';
      setPatternInsights(insights);
      setPatternData(data);
      setSheet(hasPattern ? 'result' : 'no-result');
    }, 1600);
  }

  /* Touch + mouse handlers for a single dot (level-0 only) */
  function makeDotHandlers(eventObj) {
    function startPress() {
      isLongPressRef.current = false;
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        navigator.vibrate?.(40);
        enterSelectionToggle(eventObj);
      }, 500);
    }
    function cancelPress() {
      clearTimeout(longPressTimerRef.current);
    }
    function handleShortPress() {
      if (selectedIdsRef.current.size > 0) {
        enterSelectionToggle(eventObj);
      } else {
        onEventPress?.(eventObj);
      }
    }

    return {
      /* ── Mouse (desktop / browser preview) ── */
      onMouseDown(e) { if (e.button !== 0) return; startPress(); },
      onMouseUp()    { cancelPress(); },
      onMouseLeave() { cancelPress(); },
      onClick()      { if (!isLongPressRef.current) handleShortPress(); },

      /* ── Touch (real device) ── */
      onTouchStart(e) { if (e.touches.length !== 1) return; startPress(); },
      onTouchMove()   { cancelPress(); },
      onTouchEnd(e)   {
        e.preventDefault(); // block the ghost mouse-click on touch
        cancelPress();
        if (!isLongPressRef.current) handleShortPress();
      },
    };
  }

  /* ── Derived ── */
  const allEvents      = [...events];
  const visibleEvents  = filterActive ? allEvents.filter(e => eventMatchesFilter(e, filter)) : allEvents;
  const chartBuckets   = getChartBuckets(events, level, filter);
  const chartMax       = Math.max(...chartBuckets.map(b => b.count), 1);
  const selCount       = selectedEventIds.size;
  const gridCellCount  = level === 0 ? Math.max(visibleEvents.length, MIN_GRID_CELLS) : visibleEvents.length;

  /* Fade the grid's top/bottom edges like an endless gallery */
  const fadeMask = 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)';

  /* ══════════════════════════════
     Render
  ══════════════════════════════ */
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top nav: filter (left) + hamburger (right), count truly centered over them ── */}
      <div style={{ position: 'relative', padding: '20px 20px 0' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', direction: 'ltr',
          justifyContent: 'space-between', alignItems: 'center', height: 36,
        }}>
          <button
            onClick={() => hasEvents && openFilterPanel()}
            style={{
              minWidth: 64, height: 30, borderRadius: 30, flexShrink: 0,
              padding: filterActive ? '0 8px 0 12px' : '0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              border: `1.5px solid ${hasEvents ? '#183497' : '#D4D1C3'}`,
              background: filterActive ? '#183497' : 'rgba(248,245,238,0.63)',
              color:      filterActive ? '#ffffff' : (hasEvents ? '#183497' : '#D4D1C3'),
              fontFamily: 'Atlas', fontWeight: 500, fontSize: 12,
              cursor: hasEvents ? 'pointer' : 'default',
              boxSizing: 'border-box', whiteSpace: 'nowrap',
            }}
          >
            {filterActive ? (
              <>
                <span>סינון ({filterCount})</span>
                <div
                  onClick={e => { e.stopPropagation(); setFilter(EMPTY_FILTER); setShowNoResults(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, cursor: 'pointer',
                  }}
                >
                  <CloseIcon size={14} />
                </div>
              </>
            ) : 'סנן'}
          </button>

          <button onClick={openMenu} style={iconBtn}>
            <HamburgerIcon />
          </button>
        </div>

        {/* Count — centered relative to the full screen width, independent of button sizes */}
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <p style={{
            margin: 0, fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
            direction: 'rtl', whiteSpace: 'nowrap',
          }}>
            {events.length} אירועים תועדו
          </p>
        </div>
      </div>

      {/* ── Date chip ── */}
      {hasEvents && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <span style={{
            width: 116, height: 25, borderRadius: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 9, color: '#183497',
            background: 'rgba(248,245,238,0.84)',
            border: '1.5px solid #183497',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            boxSizing: 'border-box',
          }}>
            {formatMonthYear()}
          </span>
        </div>
      )}

      {/* ══ Grid / Chart / Circle area ══ */}
      <div ref={gridAreaRef} style={{
        flex: 1, overflow: 'hidden', position: 'relative', marginTop: 8,
        transform: `scale(${pinchScale})`,
        transformOrigin: 'center center',
        transition: isPinching ? 'none' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}>

        {/* ── DOT GRID — level 0 (4-col, scrollable, interactive) ── */}
        {viewMode === 'grid' && level === 0 && (
          <div className="no-scrollbar" style={{
            height: '100%', overflowY: 'auto', padding: '0 18.5px',
            boxSizing: 'border-box',
            WebkitMaskImage: fadeMask, maskImage: fadeMask,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(4, ${dotSize}px)`,
              gap: `${gap}px`, justifyContent: 'center', direction: 'rtl',
            }}>
              {Array.from({ length: gridCellCount }, (_, i) => {
                const isAddButton = hasEvents && i === visibleEvents.length;

                if (isAddButton) {
                  return (
                    <div
                      key={i}
                      ref={addButtonRef}
                      onClick={onAddEvent}
                      style={{
                        width: dotSize, height: dotSize, borderRadius: '50%',
                        background: addButtonBg || '#F8F5EE',
                        border: `2px solid ${addButtonBorderColor || '#183497'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxSizing: 'border-box', flexShrink: 0,
                      }}
                    >
                      <PlusIcon size={26} color={addButtonIconColor || '#183497'} />
                    </div>
                  );
                }

                const event      = i < visibleEvents.length ? visibleEvents[i] : null;
                const isSelected = event ? selectedEventIds.has(event.id) : false;
                const mandalaColor = event ? (event.color || '#183497') : null;

                const handlers = event ? makeDotHandlers(event) : {};

                return (
                  <div
                    key={i}
                    ref={dotRefCallback ? (el => dotRefCallback(i, el)) : undefined}
                    {...handlers}
                    style={{
                      width: dotSize, height: dotSize, borderRadius: '50%',
                      background: event ? 'transparent' : (hasEvents ? '#EFECDE' : 'rgba(239,236,222,0.36)'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: event ? 'pointer' : 'default',
                      boxSizing: 'border-box', position: 'relative',
                      userSelect: 'none', WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none',
                    }}
                  >
                    {/* Event's mandala — sits on top of the base dot */}
                    {event && !(hideIndices && hideIndices.includes(i)) && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        animation: event.id === newEventId ? 'popIn 1.4s ease-in-out' : 'none',
                      }}>
                        <Mandala
                          timeOfDay={getTimeOfDay(event.timestamp)}
                          intensity={event.rating || 1}
                          color={mandalaColor}
                          size={dotSize * 0.861}
                        />
                      </div>
                    )}
                    {isSelected && (
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        border: '2.5px solid rgba(255,255,255,0.85)', boxSizing: 'border-box',
                      }} />
                    )}

                    {/* Checkmark badge for selected dots */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: 2, right: 2,
                        width: 21, height: 21, borderRadius: '50%',
                        background: '#323232', border: '2px solid #ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2,
                      }}>
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* ── Empty state — "+" sits on second-row first-dot from the right, text flows left ── */}
        {!hasEvents && viewMode === 'grid' && level === 0 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
            <div style={{
              display: 'flex', flexDirection: 'row', direction: 'rtl',
              alignItems: 'center', gap: 16,
              position: 'absolute',
              top: dotSize, right: 18.5, left: 18.5,
              height: dotSize,
            }}>
              <button
                onClick={onAddEvent}
                onPointerDown={() => setEmptyBtnPressed(true)}
                onPointerUp={() => setEmptyBtnPressed(false)}
                onPointerLeave={() => setEmptyBtnPressed(false)}
                style={{
                  width: dotSize, height: dotSize, borderRadius: '50%',
                  background: emptyBtnPressed ? 'rgba(24,52,151,0.08)' : '#F8F5EE', border: '2px solid #183497',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', pointerEvents: 'auto', flexShrink: 0,
                  transform: emptyBtnPressed ? 'scale(0.97)' : 'scale(1)',
                  transition: 'transform 0.12s ease, background 0.12s ease',
                }}
              >
                <PlusIcon size={30} color="#183497" />
              </button>
              <p style={{
                fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#45423A',
                textAlign: 'right', direction: 'rtl', lineHeight: 1.5,
                margin: 0, whiteSpace: 'pre-line',
              }}>
                {'לחץ להוספת\nהאירוע הראשון'}
              </p>
            </div>
          </div>
        )}

        {/* ── DOT GRID — level 1 / 2 (read-only, no selection) ── */}
        {viewMode === 'grid' && level > 0 && (
          <div className="no-scrollbar" style={{
            height: '100%', overflowY: 'auto', padding: '8px 17px',
            boxSizing: 'border-box',
            WebkitMaskImage: fadeMask, maskImage: fadeMask,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
              gap: `${gap}px`, justifyContent: 'center', direction: 'rtl',
            }}>
              {visibleEvents.map(event => {
                const mandalaColor = event.color || '#183497';
                return (
                  <div key={event.id} style={{
                    width: dotSize, height: dotSize, borderRadius: '50%',
                    background: '#EFECDE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}>
                    <Mandala
                      timeOfDay={getTimeOfDay(event.timestamp)}
                      intensity={event.rating || 1}
                      color={mandalaColor}
                      size={dotSize * 0.861}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CHART mode ── */}
        {viewMode === 'chart' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '16px 16px 12px', boxSizing: 'border-box' }}>
            {chartBuckets.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: 'Atlas', fontSize: 16, color: '#87837A', direction: 'rtl' }}>אין נתונים להצגה</p>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                {chartBuckets.map(({ label, count }, i) => {
                  const pct     = count / chartMax;
                  const dispPct = Math.round(pct * 100);
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, width: '100%', background: '#EFECDE', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
                        {count > 0 && (
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${Math.max(pct*100, 5)}%`, background: '#183497', borderRadius: 20 }}>
                            {pct >= 0.15 && (
                              <p style={{ position: 'absolute', top: 9, left: 0, right: 0, textAlign: 'center', margin: 0, fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#ffffff', lineHeight: 1 }}>
                                {dispPct}%
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#87837A', lineHeight: 1, margin: 0, flexShrink: 0 }}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── CIRCLE mode — placeholder ── */}
        {viewMode === 'circle' && (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 18, color: '#87837A', direction: 'rtl' }}>בקרוב</p>
          </div>
        )}

      </div>

      {/* ── Bottom bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px 28px' }}>
        <button
          disabled={!hasEvents}
          onClick={() => hasEvents && onNavigate('insights')}
          style={{
            width: 102, height: 40, borderRadius: 30, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            border: `1.5px solid ${hasEvents ? '#183497' : '#D4D1C3'}`, background: 'rgba(248,245,238,0.63)',
            cursor: hasEvents ? 'pointer' : 'default',
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: hasEvents ? '#183497' : '#D4D1C3',
            direction: 'ltr', boxSizing: 'border-box',
          }}
        >
          <InsightsIcon /><span>תובנות</span>
        </button>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'rgba(248,245,238,0.63)',
          border: `1.5px solid ${hasEvents ? '#183497' : '#D4D1C3'}`,
          borderRadius: 30, padding: 4, gap: 2,
          width: 200, height: 40, direction: 'rtl',
          boxSizing: 'border-box', flexShrink: 0,
        }}>
          {LEVELS.map(({ view }, idx) => {
            const isActive = view === activeView;
            return (
              <button
                key={view}
                disabled={!hasEvents}
                onClick={() => hasEvents && setLevel(idx)}
                style={{
                width: isActive ? 70 : undefined, flex: isActive ? 'none' : 1,
                height: 32, borderRadius: 24, border: 'none',
                background: isActive && hasEvents ? '#183497' : 'transparent',
                color:      isActive ? (hasEvents ? '#ffffff' : '#D4D1C3') : (hasEvents ? '#183497' : '#D4D1C3'),
                fontFamily: 'Atlas', fontWeight: 400, fontSize: isActive ? 14 : 13,
                cursor: hasEvents ? 'pointer' : 'default', whiteSpace: 'nowrap', boxSizing: 'border-box',
              }}>
                {view}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════
          Hamburger popup menu
      ══════════════════════════════ */}
      {showMenu && (
        <>
          {/* Scrim — fades in */}
          <div onClick={closeMenu} style={{
            position: 'absolute', inset: 0, zIndex: 25,
            background: 'rgba(28,28,28,0.83)',
            opacity: menuVisible ? 1 : 0,
            transition: 'opacity 0.22s ease',
          }} />

          {/* Close button */}
          <button onClick={closeMenu} style={{
            position: 'absolute', top: 20, right: 20, zIndex: 27,
            width: 35, height: 35, borderRadius: '50%',
            background: '#EBE8DB', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#323232',
            opacity: menuVisible ? 1 : 0,
            transition: 'opacity 0.22s ease',
          }}>
            <CloseIcon size={16} />
          </button>

          {/* Card — scales in from top-right corner */}
          <div style={{
            position: 'absolute', top: 63, right: 20, zIndex: 26,
            width: 212, background: '#F8F5EE', borderRadius: 15,
            border: '1px solid #E2DFD0', padding: '8px 0',
            display: 'flex', flexDirection: 'column', direction: 'rtl',
            transformOrigin: 'top right',
            opacity: menuVisible ? 1 : 0,
            transform: menuVisible ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(-10px)',
            transition: 'opacity 0.22s ease, transform 0.22s cubic-bezier(0.32,0.72,0,1)',
          }}>
            {MENU_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => { onNavigate(id); closeMenu(); }}
                onPointerDown={() => setMenuPressed(id)}
                onPointerUp={() => setMenuPressed(null)}
                onPointerLeave={() => setMenuPressed(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 10,
                  border: 'none', cursor: 'pointer',
                  padding: '13px 18px', color: '#323232',
                  fontFamily: 'Atlas', fontWeight: 400, fontSize: 14,
                  background: menuPressed === id ? 'rgba(50,50,50,0.07)' : 'none',
                  borderRadius: 10, margin: '0 6px', padding: '13px 12px',
                  transition: 'background 0.1s ease',
                }}
              >
                <Icon /><span>{label}</span>
              </button>
            ))}

            <div style={{ height: 1, background: '#D4D1C3', margin: '6px 18px' }} />

            <button
              onClick={() => {
                ['onuma_onboarded', 'onuma_spaces', 'onuma_events',
                 'onuma_logged_in', 'onuma_userName', 'onuma_userEmail',
                 'onuma_notifications', 'onuma_theme', 'onuma_locations']
                  .forEach(k => localStorage.removeItem(k));
                window.location.reload();
              }}
              onPointerDown={() => setMenuPressed('logout')}
              onPointerUp={() => setMenuPressed(null)}
              onPointerLeave={() => setMenuPressed(null)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 10,
                border: 'none', cursor: 'pointer',
                padding: '13px 18px', color: '#323232',
                fontFamily: 'Atlas', fontWeight: 400, fontSize: 14,
                background: menuPressed === 'logout' ? 'rgba(50,50,50,0.07)' : 'none',
                borderRadius: 10, margin: '0 6px', padding: '13px 12px',
                transition: 'background 0.1s ease',
              }}
            >
              <LogoutIcon /><span>התנתק</span>
            </button>
          </div>
        </>
      )}

      {/* ══════════════════════════════
          Selection bottom sheet
      ══════════════════════════════ */}
      {sheet !== null && sheet !== 'result' && sheet !== 'no-result' && (
        <div style={{
          position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 15,
          background: '#F8F5EE', borderRadius: 20,
          border: '1px solid #E2DFD0',
          padding: sheet === 'preview' ? '14px 20px' : '20px',
          ...((sheet === 'preview') ? { height: 93, boxSizing: 'border-box' } : (sheet === 'summary' || sheet === 'loading') ? { height: 156, boxSizing: 'border-box' } : {}),
          boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
        }}>

          {/* ── PREVIEW: last selected event ── */}
          {sheet === 'preview' && lastSelectedEvent && (
            <div style={{ direction: 'rtl', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#323232', marginBottom: 8, lineHeight: 1 }}>
                {formatEventDate(lastSelectedEvent.timestamp)}
              </p>
              <p style={{
                fontFamily: 'Atlas', fontWeight: 700, fontSize: 18, color: '#323232',
                lineHeight: 1.45, overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {lastSelectedEvent.text || '—'}
              </p>
            </div>
          )}

          {/* ── SUMMARY + LOADING: count + action buttons ── */}
          {(sheet === 'summary' || sheet === 'loading') && (
            <div style={{ direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
              {/* X button */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                <button onClick={clearSelection} style={{ ...iconBtn, color: '#87837A' }}>
                  <CloseIcon />
                </button>
              </div>
              {/* Title */}
              <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 18, color: '#323232', textAlign: 'right', margin: 0, marginBottom: 20 }}>
                {selCount} אירועים נבחרו
              </p>
              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                {/* חיפוש דפוס — left, azure */}
                <button
                  onClick={sheet === 'summary' ? handleFindPattern : undefined}
                  style={{
                    width: 160, height: 36, borderRadius: 30,
                    background: sheet === 'loading' ? '#2E2B25' : '#45423A', border: 'none',
                    color: '#F8F5EE', cursor: sheet === 'summary' ? 'pointer' : 'default',
                    fontFamily: 'Atlas', fontWeight: 700, fontSize: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    boxSizing: 'border-box',
                  }}
                >
                  {sheet === 'loading' ? <>מחפש קשרים...<Spinner /></> : 'חיפוש דפוס משותף'}
                </button>
                {/* נקה בחירה — right, outlined */}
                <button
                  onClick={clearSelection}
                  style={{
                    width: 86, height: 36, borderRadius: 30, flexShrink: 0,
                    background: 'transparent', border: '1.5px solid #45423A',
                    color: '#45423A', cursor: 'pointer',
                    fontFamily: 'Atlas', fontWeight: 700, fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                >
                  נקה בחירה
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ── RESULT: full-screen overlay ── */}
      {sheet === 'result' && patternData && (
        <div style={{
          position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 15,
          background: '#F8F5EE', borderRadius: 20,
          border: '1px solid #E2DFD0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
          padding: '28px 24px 32px',
          direction: 'rtl',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        }}>
          {/* Title */}
          <p style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 16, color: '#323232', textAlign: 'right', lineHeight: '20px', margin: 0, width: '100%' }}>
            זיהינו דפוס משותף בין<br />האירועים שבחרת
          </p>

          {/* Dominant Mandala */}
          <Mandala
            timeOfDay={patternData.mandala.timeOfDay}
            intensity={patternData.mandala.intensity}
            color={patternData.mandala.color}
            size={120}
          />

          {/* 4 Info Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', direction: 'rtl' }}>
            {[
              { label: 'מיקום',       value: patternData.location.value || '—', sub: patternData.location.value ? `(${patternData.location.count} מתוך ${patternData.location.total} אירועים)` : null },
              { label: 'זמן',         value: patternData.time.value,             sub: `(${patternData.time.count} מתוך ${patternData.time.total} אירועים)` },
              { label: 'עוצמה',       value: `ממוצע +${patternData.intensity.value}`, sub: null },
              { label: 'סוג אירועים', value: patternData.types.value,            sub: null },
            ].map(({ label, value, sub }) => (
              <div key={label} style={{
                background: '#EAE7D8', borderRadius: 12, padding: '12px 14px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#87837A' }}>{label}</span>
                <span style={{ fontFamily: 'Atlas', fontWeight: 600, fontSize: 14, color: '#323232', lineHeight: 1.4 }}>{value}</span>
                {sub && <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 11, color: '#87837A' }}>{sub}</span>}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, width: '100%' }}>
            <button onClick={clearSelection} style={{
              width: 120, height: 44, borderRadius: 30, flexShrink: 0,
              background: '#45423A', border: 'none',
              color: '#F8F5EE', cursor: 'pointer',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 13,
            }}>
              סגור
            </button>
            <button onClick={() => setShowReportConfirm(true)} style={{
              flex: 1, height: 44, borderRadius: 30,
              background: 'transparent', border: '1.5px solid #45423A',
              color: '#45423A', cursor: 'pointer',
              fontFamily: 'Atlas', fontWeight: 700, fontSize: 13,
              boxSizing: 'border-box',
            }}>
              הוסף לדו״ח התקופתי
            </button>
          </div>
        </div>
      )}

      {/* ── No-pattern result card ── */}
      {sheet === 'no-result' && (
        <div style={{
          position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 15,
          height: 292, boxSizing: 'border-box',
          background: '#F8F5EE', borderRadius: 20,
          border: '1px solid #E2DFD0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
          padding: '28px 24px 28px',
          direction: 'rtl',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 16, color: '#323232',
            textAlign: 'center', margin: 0, lineHeight: 1.45,
          }}>
            לא הצלחנו למצוא דפוס משותף{'\n'}בין האירועים שבחרת..
          </p>
          <EmptyMandala size={120} />
          <button onClick={clearSelection} style={{
            width: '100%', height: 56, borderRadius: 30, border: 'none',
            background: '#45423A', color: '#F8F5EE',
            fontFamily: 'Atlas', fontWeight: 700, fontSize: 16,
            cursor: 'pointer',
          }}>
            חזור לאירועים שלי
          </button>
        </div>
      )}

      {/* ── Report confirm modal ── */}
      {showReportConfirm && (
        <ReportConfirmModal
          onGoReport={() => { setShowReportConfirm(false); clearSelection(); onNavigate('reports'); }}
          onGoHome={() => { setShowReportConfirm(false); clearSelection(); }}
        />
      )}

      {/* ── No-results modal ── */}
      {showNoResults && (
        <NoResultsModal
          onChangeFilter={() => { setShowNoResults(false); openFilterPanel(); }}
          onClear={() => { setFilter(EMPTY_FILTER); setShowNoResults(false); }}
        />
      )}

      {/* ── Filter panel overlay ── */}
      {showFilterPanel && (
        <FilterPanel
          events={events}
          currentFilter={filter}
          onApply={applyFilter}
          onClose={closeFilterPanel}
          visible={filterPanelVisible}
        />
      )}

    </div>
  );
}

/* ── Shared styles ── */
const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a',
};
