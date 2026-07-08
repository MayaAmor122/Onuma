import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Mandala, { getTimeOfDay } from '../components/Mandala';

const MONTHS_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const DAYS_HE   = ['א','ב','ג','ד','ה','ו','ש'];

const CELL    = 44;
const CGAP    = 6;
const EMPTY_C = '#E7E4D4';
const MUTED_C = '#C8C5B5';

const TIME_INFO = {
  morning:   { label: 'הבוקר',   range: '05:00 - 12:00' },
  noon:      { label: 'הצהריים', range: '12:00 - 15:00' },
  afternoon: { label: 'אחה"צ',   range: '15:00 - 18:00' },
  evening:   { label: 'הערב',    range: '18:00 - 21:00' },
  night:     { label: 'הלילה',   range: '21:00 - 05:00' },
};

const SLIDE_TITLES = [
  'בוא נתחיל מהמקום',
  'עכשיו נסתכל על הזמן',
  'ומה לגבי העוצמה?',
  'איזה דפוס חזר על עצמו?',
  'מבט על התקופה',
];

/* ── Helpers ── */
function topEntry(map) {
  return Object.entries(map).sort(([,a],[,b]) => b - a)[0] || null;
}

function filterMonth(events, month, year) {
  return events.filter(e => {
    const d = new Date(e.timestamp);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

function computeSlide(idx, events, month, year) {
  const me = filterMonth(events, month, year);
  const n  = me.length;

  if (idx === 0) {
    const lc = {};
    me.forEach(e => { if (e.location) lc[e.location] = (lc[e.location]||0)+1; });
    const top = topEntry(lc);
    const pct = top && n > 0 ? Math.round(top[1]/n*100) : 0;
    return {
      me, domKey: top?.[0] ?? null,
      pill: top ? `${top[0]} היה המרחב הפעיל ביותר` : 'אין נתונים מספיקים',
      sub:  top ? `${pct}% מהאירועים שתועדו\nהתרחשו ב${top[0]}` : '',
    };
  }
  if (idx === 1) {
    const tc = {};
    me.forEach(e => { const t = getTimeOfDay(e.timestamp); tc[t] = (tc[t]||0)+1; });
    const top = topEntry(tc);
    const inf = top ? TIME_INFO[top[0]] : null;
    return {
      me, domKey: top?.[0] ?? null,
      pill: inf ? `רוב האירועים התרחשו בשעות ${inf.label}` : 'אין נתונים מספיקים',
      sub:  inf ? `מרבית האירועים תועדו בין\nהשעות ${inf.range}` : '',
    };
  }
  if (idx === 2) {
    const rc = {};
    me.forEach(e => { const r = e.rating||1; rc[r] = (rc[r]||0)+1; });
    const top = topEntry(rc);
    const pct = top && n > 0 ? Math.round(top[1]/n*100) : 0;
    const rv  = top ? Number(top[0]) : 0;
    return {
      me, domKey: rv || null,
      pill: top ? `רוב האירועים סומנו בעוצמה ${rv <= 2 ? 'נמוכה' : rv <= 3 ? 'בינונית' : 'גבוהה'}` : 'אין נתונים מספיקים',
      sub:  top ? `${pct}% מהאירועים דורגו\nבעוצמה ${top[0]} מתוך 5` : '',
    };
  }
  if (idx === 3) {
    const tyc = {};
    me.forEach(e => (e.types||[]).forEach(t => { tyc[t] = (tyc[t]||0)+1; }));
    const top = topEntry(tyc);
    const evWith = top ? me.filter(e => (e.types||[]).includes(top[0])).length : 0;
    const pct = n > 0 ? Math.round(evWith/n*100) : 0;
    return {
      me, domKey: top?.[0] ?? null,
      pill: top ? `אירועי '${top[0]}' הם הסוג הנפוץ ביותר` : 'אין נתונים מספיקים',
      sub:  top ? `${pct}% מהאירועים שתועדו\nסווגו כאירועי ${top[0]}` : '',
    };
  }
  /* idx === 4: overview */
  const pm = month === 0 ? 11 : month - 1;
  const py = month === 0 ? year - 1 : year;
  const prev = filterMonth(events, pm, py);
  let dir = null, pct = null;
  if (prev.length > 0) {
    const diff = n - prev.length;
    pct = Math.abs(Math.round(diff/prev.length*100));
    dir = diff >= 0 ? 'עלייה' : 'ירידה';
  } else if (n > 0) { pct = 100; dir = 'עלייה'; }
  return {
    me, domKey: null,
    pill: dir ? `חלה ${dir} של ${pct}% במספר האירועים` : 'אין נתונים להשוואה',
    sub:  dir ? `בהשוואה ל${MONTHS_HE[pm]} נרשמה ${dir}\nשל ${pct}% במספר האירועים שתועדו` : '',
  };
}

function getDayCell(dayEvts, idx, domKey) {
  if (!dayEvts.length) return { event: null, color: EMPTY_C };
  if (idx === 0) {
    const d = dayEvts.find(e => e.location === domKey);
    return d ? { event: d, color: d.color||'#183497' } : { event: dayEvts[0], color: MUTED_C };
  }
  if (idx === 1) {
    const d = dayEvts.find(e => getTimeOfDay(e.timestamp) === domKey);
    return d ? { event: d, color: '#B6CDFF' } : { event: dayEvts[0], color: MUTED_C };
  }
  if (idx === 2) return { event: dayEvts[0], color: '#FFDC60' };
  if (idx === 3) {
    const d = dayEvts.find(e => (e.types||[]).includes(domKey));
    return d ? { event: d, color: '#5CB85C' } : { event: dayEvts[0], color: MUTED_C };
  }
  return { event: dayEvts[0], color: dayEvts[0].color||'#183497' };
}

/* ── Dots circle spinner — matches LoadingScreen ── */
function DotSpinner() {
  const DOT_COUNT = 12;
  const RADIUS    = 19;
  return (
    <svg width="50" height="50" viewBox="-25 -25 50 50"
         style={{ animation: 'spin 1s linear infinite' }}>
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        const angle   = (i / DOT_COUNT) * 2 * Math.PI;
        const x       = RADIUS * Math.cos(angle);
        const y       = RADIUS * Math.sin(angle);
        const opacity = 0.15 + 0.85 * (i / (DOT_COUNT - 1));
        return <circle key={i} cx={x} cy={y} r={3} fill="#183497" opacity={opacity} />;
      })}
    </svg>
  );
}

/* ── Empty-day mandala (reconstructed from "Insight empty state mandala.svg") ── */
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
          return (
            <circle key={`${ri}-${i}`}
              cx={r * Math.cos(a)} cy={r * Math.sin(a)}
              r={dotR} fill={EMPTY_C} />
          );
        })
      )}
    </svg>
  );
}

/* ── Icons ── */
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

/* ── Calendar grid ── */
function CalendarGrid({ monthEvents, slideIdx, domKey, month, year }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDOW    = new Date(year, month, 1).getDay(); /* 0 = Sunday = א */

  const cells = [];
  for (let i = 0; i < firstDOW; i++) cells.push({ blank: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const de = monthEvents.filter(e => new Date(e.timestamp).getDate() === d);
    const { event, color } = getDayCell(de, slideIdx, domKey);
    cells.push({ blank: false, event, color });
  }

  const dot = CELL * 0.88;

  return (
    <div style={{ padding: '0 19px' }}>
      {/* Day-of-week headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(7, ${CELL}px)`,
        gap: CGAP, direction: 'rtl', marginBottom: 5,
      }}>
        {DAYS_HE.map(d => (
          <div key={d} style={{
            textAlign: 'center', fontFamily: 'Atlas', fontWeight: 300, fontSize: 16, color: '#87837A',
            height: 20, lineHeight: '20px',
          }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(7, ${CELL}px)`,
        gap: CGAP, direction: 'rtl',
      }}>
        {cells.map((cell, i) => (
          <div key={i} style={{
            width: CELL, height: CELL,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {cell.blank ? null : cell.event ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mandala
                  timeOfDay={getTimeOfDay(cell.event.timestamp)}
                  intensity={cell.event.rating||1}
                  color={cell.color}
                  size={dot}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EmptyMandala size={dot} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Year grid: 12 months × mandalas in a 4-col RTL grid ── */
function YearGrid({ events, slideIdx, domKey, year }) {
  return (
    <div style={{ padding: '0 19px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6, direction: 'rtl',
      }}>
        {Array.from({ length: 12 }, (_, mi) => {
          const me = events.filter(e => {
            const d = new Date(e.timestamp);
            return d.getMonth() === mi && d.getFullYear() === year;
          });

          const label = (
            <span style={{ fontFamily: 'Atlas', fontWeight: 300, fontSize: 11, color: '#87837A', textAlign: 'center' }}>
              {MONTHS_HE[mi]}
            </span>
          );

          if (me.length === 0) {
            return (
              <div key={mi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 8 }}>
                <div style={{ height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EmptyMandala size={62} />
                </div>
                {label}
              </div>
            );
          }

          const { color } = getDayCell(me, slideIdx, domKey);

          const tc = {};
          me.forEach(e => { const t = getTimeOfDay(e.timestamp); tc[t] = (tc[t]||0)+1; });
          const timeOfDay = topEntry(tc)?.[0] || 'morning';

          const rc = {};
          me.forEach(e => { const r = e.rating||1; rc[r] = (rc[r]||0)+1; });
          const intensity = Number(topEntry(rc)?.[0] || 1);

          return (
            <div key={mi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 8 }}>
              <div style={{ height: 66, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mandala timeOfDay={timeOfDay} intensity={intensity} color={color} size={62} />
              </div>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   InsightsFlow
════════════════════════════════ */
export default function InsightsFlow({ onClose }) {
  const { events } = useApp();
  const now = new Date();
  const touchX = useRef(null);

  const [loading,       setLoading]       = useState(true);
  const [welcome,       setWelcome]       = useState(false);
  const [fadeIn,        setFadeIn]        = useState(false);
  const [step,          setStep]          = useState(0);
  const [displayStep,   setDisplayStep]   = useState(0);
  const [contentVisible,setContentVisible]= useState(true);
  const [viewMode, setViewMode] = useState('חודש');
  const [month,    setMonth]    = useState(now.getMonth());
  const [year,     setYear]     = useState(now.getFullYear());

  /* Auto-dismiss loading */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setWelcome(true);
      requestAnimationFrame(() => setFadeIn(true));
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  function dismissWelcome() {
    setFadeIn(false);
    setTimeout(() => {
      setWelcome(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setFadeIn(true)));
    }, 300);
  }

  const isCurrent = viewMode === 'שנה'
    ? year >= now.getFullYear()
    : month === now.getMonth() && year === now.getFullYear();

  function goPrev() {
    if (viewMode === 'שנה') { setYear(y => y - 1); return; }
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function goNext() {
    if (isCurrent) return;
    if (viewMode === 'שנה') { setYear(y => y + 1); return; }
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }
  const stepRef = useRef(0);
  function goStep(delta) {
    const newStep = Math.max(0, Math.min(4, stepRef.current + delta));
    if (newStep === stepRef.current) return;
    stepRef.current = newStep;
    setStep(newStep);
    setContentVisible(false);
    setTimeout(() => {
      setDisplayStep(newStep);
      requestAnimationFrame(() => requestAnimationFrame(() => setContentVisible(true)));
    }, 160);
  }

  const { me, domKey, pill, sub } = computeSlide(displayStep, events, month, year);

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: '#F8F5EE', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <DotSpinner />
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 16,
          color: '#45423A', margin: 0, direction: 'rtl',
        }}>
          מכין את התובנות שלך...
        </p>
      </div>
    );
  }

  /* ── Welcome screen ── */
  if (welcome) {
    return (
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#F8F5EE', overflow: 'hidden',
          alignItems: 'center', justifyContent: 'center', gap: 22, paddingBottom: 15,
          opacity: fadeIn ? 1 : 0, transition: 'opacity 0.3s ease',
        }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) dismissWelcome();
          touchX.current = null;
        }}
        onMouseDown={e => { touchX.current = e.clientX; }}
        onMouseUp={e => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          if (Math.abs(dx) > 40) dismissWelcome();
          touchX.current = null;
        }}
        onMouseLeave={() => { touchX.current = null; }}
      >
        <EmptyMandala size={265} />

        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 20,
          color: '#45423A', textAlign: 'center', direction: 'rtl',
          lineHeight: '28px', margin: 0, padding: '0 40px',
          whiteSpace: 'pre-line',
        }}>
          {`עד כה תיעדת ${events.length} אירועים.\n`}
          <span style={{ fontWeight: 500 }}>החלק לתובנה הבאה</span>
          {' כדי לצפות\nבסיכום תובנות שהתקבלו..'}
        </p>

        <button
          onClick={dismissWelcome}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#45423A', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="#F8F5EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </div>
    );
  }

  /* ── Slide content ── */
  return (
    <div
      style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: '#F8F5EE', overflow: 'hidden',
        opacity: fadeIn ? 1 : 0, transition: 'opacity 0.3s ease',
      }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) goStep(dx > 0 ? 1 : -1);
        touchX.current = null;
      }}
      onMouseDown={e => { touchX.current = e.clientX; }}
      onMouseUp={e => {
        if (touchX.current === null) return;
        const dx = e.clientX - touchX.current;
        if (Math.abs(dx) > 40) goStep(dx > 0 ? 1 : -1);
        touchX.current = null;
      }}
      onMouseLeave={() => { touchX.current = null; }}
    >

      {/* ── Top bar: X and > absolute on sides; dots + hint centered in flow ── */}
      <div style={{ position: 'relative', padding: '20px 20px 0', flexShrink: 0 }}>
        {/* X — absolute left */}
        <button onClick={onClose} style={{ ...iBtn, position: 'absolute', top: 20, left: 20 }}>
          <XIcon />
        </button>
        {/* Chevron — absolute right, goes back one step (hidden on first step) */}
        <button
          onClick={() => goStep(-1)}
          style={{ ...iBtn, position: 'absolute', top: 20, right: 20, opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}
        >
          <ChevronRight />
        </button>

        {/* Dots + hint — in flow, stacked, centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 6, alignItems: 'center', height: 24 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                height: 6, borderRadius: 3,
                width: i === step ? 18 : 6,
                background: i === step ? '#323232' : 'rgba(50,50,50,0.22)',
                transition: 'width 0.2s ease',
              }} />
            ))}
          </div>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A',
            margin: 0,
          }}>
            {step < 4 ? 'החלק ימינה' : 'החלק שמאלה'}
          </p>
        </div>
      </div>

      {/* ── Title row: תובנות + count ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '38px 20px 0', flexShrink: 0, direction: 'rtl',
      }}>
        <p style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A', margin: 0 }}>תובנות</p>
        <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#45423A', margin: 0 }}>
          {events.length} אירועים נותחו
        </p>
      </div>

      {/* ── Month / Year toggle ── */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '35px 0 0', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', direction: 'rtl',
          width: 241, height: 45, borderRadius: 30,
          border: '1.5px solid #183497', boxSizing: 'border-box',
          padding: 4, gap: 2, background: '#F8F5EE',
        }}>
          {['חודש','שנה'].map(v => {
            const active = viewMode === v;
            return (
              <button key={v} onClick={() => setViewMode(v)} style={{
                width: active ? 120 : undefined, flex: active ? 'none' : 1,
                height: 36, borderRadius: 24, border: 'none',
                background: active ? '#183497' : 'transparent',
                color: active ? '#fff' : '#183497',
                fontFamily: 'Atlas', fontWeight: active ? 700 : 400, fontSize: 12,
                cursor: 'pointer', transition: 'background 0.15s ease',
              }}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* ── Month navigator ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        margin: '55px 0 0', flexShrink: 0, padding: '0 20px',
      }}>
        <button
          onClick={goNext}
          style={{ ...iBtn, opacity: isCurrent ? 0.25 : 1, cursor: isCurrent ? 'default' : 'pointer' }}
        >
          <ChevronLeft />
        </button>
        <span style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#323232',
          minWidth: 120, textAlign: 'center',
        }}>
          {viewMode === 'שנה' ? year : `${MONTHS_HE[month]} ${year}`}
        </span>
        <button onClick={goPrev} style={{ ...iBtn }}>
          <ChevronRight />
        </button>
      </div>

      {/* ── Animated content: calendar + insight text ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? 'translateY(0px)' : 'translateY(6px)',
        transition: contentVisible
          ? 'opacity 0.22s ease, transform 0.22s ease'
          : 'opacity 0.14s ease',
      }}>
        {/* ── Calendar or Year placeholder ── */}
        <div style={{ flexShrink: 0, marginTop: 30 }}>
          {viewMode === 'חודש' ? (
            <CalendarGrid
              monthEvents={me}
              slideIdx={displayStep}
              domKey={domKey}
              month={month}
              year={year}
            />
          ) : (
            <YearGrid
              events={events}
              slideIdx={displayStep}
              domKey={domKey}
              year={year}
            />
          )}
        </div>

        {/* Spacer — pushes insight to bottom */}
        <div style={{ flex: 1 }} />

        {/* ── Slide title + sub insight ── */}
        <div style={{ padding: '10px 20px 40px', flexShrink: 0, direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 500, fontSize: 16, color: '#323232',
            textAlign: 'center', margin: 0, lineHeight: 1.35,
          }}>
            {SLIDE_TITLES[displayStep]}
          </p>
          {sub ? (
            <p style={{
              fontFamily: 'Atlas', fontWeight: 400, fontSize: 15, color: '#323232',
              margin: 0, textAlign: 'center', lineHeight: 1.5, whiteSpace: 'pre-line',
            }}>{sub}</p>
          ) : null}
        </div>
      </div>

    </div>
  );
}

const iBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
