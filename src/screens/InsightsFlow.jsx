import { useState, useEffect, useRef } from 'react';
import Mandala, { getTimeOfDay } from '../components/Mandala';

const MONTHS_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];

/* ── Static historical data for past months (demo only) ── */
const H = (y, mo, d, h, m) => new Date(y, mo, d, h, m).toISOString();
const FAKE_HISTORICAL_EVENTS = [
  /* ── June 2026 ── */
  { id:'h01', timestamp:H(2026,5, 1, 8,15), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h02', timestamp:H(2026,5, 2, 9,30), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h03', timestamp:H(2026,5, 3, 8, 0), location:'עבודה', rating:4, types:['כאב'],    color:'#00BE4A' },
  { id:'h04', timestamp:H(2026,5, 5, 9, 0), location:'בית',   rating:3, types:['עייפות'], color:'#00BE4A' },
  { id:'h05', timestamp:H(2026,5, 7, 8,45), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h06', timestamp:H(2026,5, 8, 9,20), location:'עבודה', rating:2, types:['כאב'],    color:'#00BE4A' },
  { id:'h07', timestamp:H(2026,5,10, 8,30), location:'עבודה', rating:4, types:['כאב'],    color:'#00BE4A' },
  { id:'h08', timestamp:H(2026,5,11,20, 0), location:'בית',   rating:3, types:['עייפות'], color:'#00BE4A' },
  { id:'h09', timestamp:H(2026,5,13, 9,10), location:'עבודה', rating:2, types:['כאב'],    color:'#00BE4A' },
  { id:'h10', timestamp:H(2026,5,14, 8,30), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h11', timestamp:H(2026,5,16,19,30), location:'בית',   rating:3, types:['עייפות'], color:'#00BE4A' },
  { id:'h12', timestamp:H(2026,5,17, 8, 0), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h13', timestamp:H(2026,5,19, 9, 0), location:'עבודה', rating:2, types:['כאב'],    color:'#00BE4A' },
  { id:'h14', timestamp:H(2026,5,21, 8,15), location:'עבודה', rating:4, types:['כאב'],    color:'#00BE4A' },
  { id:'h15', timestamp:H(2026,5,23,20,30), location:'בית',   rating:3, types:['עייפות'], color:'#00BE4A' },
  { id:'h16', timestamp:H(2026,5,24, 8,45), location:'עבודה', rating:2, types:['כאב'],    color:'#00BE4A' },
  { id:'h17', timestamp:H(2026,5,26, 9,15), location:'עבודה', rating:3, types:['כאב'],    color:'#00BE4A' },
  { id:'h18', timestamp:H(2026,5,28, 8, 0), location:'עבודה', rating:4, types:['כאב'],    color:'#00BE4A' },
  { id:'h19', timestamp:H(2026,5,29,19,30), location:'בית',   rating:3, types:['עייפות'], color:'#00BE4A' },
  { id:'h20', timestamp:H(2026,5,30, 9,30), location:'עבודה', rating:2, types:['כאב'],    color:'#00BE4A' },

  /* ── May 2026 ── */
  { id:'h21', timestamp:H(2026,4, 1,20, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h22', timestamp:H(2026,4, 3,21, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h23', timestamp:H(2026,4, 6,19,30), location:'בית',   rating:5, types:['לחץ'],    color:'#FFDB60' },
  { id:'h24', timestamp:H(2026,4, 8,20,15), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h25', timestamp:H(2026,4,10, 9, 0), location:'עבודה', rating:3, types:['כאב'],    color:'#FFDB60' },
  { id:'h26', timestamp:H(2026,4,13,21,15), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h27', timestamp:H(2026,4,15,20,45), location:'בית',   rating:5, types:['לחץ'],    color:'#FFDB60' },
  { id:'h28', timestamp:H(2026,4,18, 9,30), location:'עבודה', rating:3, types:['כאב'],    color:'#FFDB60' },
  { id:'h29', timestamp:H(2026,4,20,19, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h30', timestamp:H(2026,4,22,21,30), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },
  { id:'h31', timestamp:H(2026,4,25,20, 0), location:'בית',   rating:5, types:['לחץ'],    color:'#FFDB60' },
  { id:'h32', timestamp:H(2026,4,27, 9,15), location:'עבודה', rating:3, types:['כאב'],    color:'#FFDB60' },
  { id:'h33', timestamp:H(2026,4,29,21, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFDB60' },

  /* ── April 2026 ── */
  { id:'h34', timestamp:H(2026,3, 2,14,30), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },
  { id:'h35', timestamp:H(2026,3, 5,15, 0), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },
  { id:'h36', timestamp:H(2026,3, 8,14, 0), location:'עבודה', rating:2, types:['עייפות'], color:'#FFC8CE' },
  { id:'h37', timestamp:H(2026,3,11,15,30), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },
  { id:'h38', timestamp:H(2026,3,13,19,45), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h39', timestamp:H(2026,3,16,14,15), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },
  { id:'h40', timestamp:H(2026,3,19,15, 0), location:'עבודה', rating:2, types:['עייפות'], color:'#FFC8CE' },
  { id:'h41', timestamp:H(2026,3,22,20, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h42', timestamp:H(2026,3,25,14,30), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },
  { id:'h43', timestamp:H(2026,3,28,15,45), location:'עבודה', rating:3, types:['עייפות'], color:'#FFC8CE' },

  /* ── March 2026 ── */
  { id:'h44', timestamp:H(2026,2, 1,15, 0), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },
  { id:'h45', timestamp:H(2026,2, 4,14,30), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },
  { id:'h46', timestamp:H(2026,2, 6,16, 0), location:'בית',   rating:4, types:['כאב'],    color:'#B6CDFF' },
  { id:'h47', timestamp:H(2026,2, 9,15,15), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },
  { id:'h48', timestamp:H(2026,2,11, 8,30), location:'עבודה', rating:2, types:['עייפות'], color:'#B6CDFF' },
  { id:'h49', timestamp:H(2026,2,14,14,30), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },
  { id:'h50', timestamp:H(2026,2,17,15,45), location:'בית',   rating:4, types:['כאב'],    color:'#B6CDFF' },
  { id:'h51', timestamp:H(2026,2,19, 9, 0), location:'עבודה', rating:2, types:['עייפות'], color:'#B6CDFF' },
  { id:'h52', timestamp:H(2026,2,22,14, 0), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },
  { id:'h53', timestamp:H(2026,2,24,16,30), location:'בית',   rating:4, types:['כאב'],    color:'#B6CDFF' },
  { id:'h54', timestamp:H(2026,2,26, 8,15), location:'עבודה', rating:2, types:['עייפות'], color:'#B6CDFF' },
  { id:'h55', timestamp:H(2026,2,28,15, 0), location:'בית',   rating:3, types:['כאב'],    color:'#B6CDFF' },

  /* ── February 2026 ── */
  { id:'h56', timestamp:H(2026,1, 2, 8,30), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },
  { id:'h57', timestamp:H(2026,1, 5, 9, 0), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },
  { id:'h58', timestamp:H(2026,1, 7, 8,15), location:'עבודה', rating:1, types:['עייפות'], color:'#183497' },
  { id:'h59', timestamp:H(2026,1,10, 9,30), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },
  { id:'h60', timestamp:H(2026,1,12,20, 0), location:'בית',   rating:3, types:['לחץ'],    color:'#183497' },
  { id:'h61', timestamp:H(2026,1,15, 8,45), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },
  { id:'h62', timestamp:H(2026,1,18, 9, 0), location:'עבודה', rating:1, types:['עייפות'], color:'#183497' },
  { id:'h63', timestamp:H(2026,1,21,19,30), location:'בית',   rating:3, types:['לחץ'],    color:'#183497' },
  { id:'h64', timestamp:H(2026,1,24, 8,30), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },
  { id:'h65', timestamp:H(2026,1,26, 9,15), location:'עבודה', rating:2, types:['עייפות'], color:'#183497' },

  /* ── January 2026 ── */
  { id:'h66', timestamp:H(2026,0, 3,20,30), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h67', timestamp:H(2026,0, 6,21, 0), location:'בית',   rating:5, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h68', timestamp:H(2026,0, 8,20, 0), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h69', timestamp:H(2026,0,11,21,30), location:'בית',   rating:5, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h70', timestamp:H(2026,0,13, 9, 0), location:'עבודה', rating:3, types:['כאב'],    color:'#FFC8CE' },
  { id:'h71', timestamp:H(2026,0,16,20,15), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h72', timestamp:H(2026,0,19,21, 0), location:'בית',   rating:5, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h73', timestamp:H(2026,0,22,20,45), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h74', timestamp:H(2026,0,25, 9,30), location:'עבודה', rating:3, types:['כאב'],    color:'#FFC8CE' },
  { id:'h75', timestamp:H(2026,0,27,21, 0), location:'בית',   rating:5, types:['לחץ'],    color:'#FFC8CE' },
  { id:'h76', timestamp:H(2026,0,29,20,30), location:'בית',   rating:4, types:['לחץ'],    color:'#FFC8CE' },

  /* ── July 2026 ── */
  { id:'h77', timestamp:H(2026,6, 1, 8,30), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
  { id:'h78', timestamp:H(2026,6, 3, 9, 0), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
  { id:'h79', timestamp:H(2026,6, 5, 8,15), location:'עבודה', rating:4, types:['כאב'],    color:'#183497' },
  { id:'h80', timestamp:H(2026,6, 7,20, 0), location:'בית',   rating:3, types:['עייפות'], color:'#183497' },
  { id:'h81', timestamp:H(2026,6, 9, 9,30), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
  { id:'h82', timestamp:H(2026,6,11, 8,45), location:'עבודה', rating:2, types:['כאב'],    color:'#183497' },
  { id:'h83', timestamp:H(2026,6,13, 9,15), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
  { id:'h84', timestamp:H(2026,6,15,20,30), location:'בית',   rating:3, types:['עייפות'], color:'#183497' },
  { id:'h85', timestamp:H(2026,6,17, 8, 0), location:'עבודה', rating:4, types:['כאב'],    color:'#183497' },
  { id:'h86', timestamp:H(2026,6,19, 9,45), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
  { id:'h87', timestamp:H(2026,6,21, 8,30), location:'עבודה', rating:3, types:['כאב'],    color:'#183497' },
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

function filterPeriod(events, viewMode, month, year) {
  if (viewMode === 'שנה') return events.filter(e => new Date(e.timestamp).getFullYear() === year);
  return filterMonth(events, month, year);
}

function filterPrevPeriod(events, viewMode, month, year) {
  if (viewMode === 'שנה') return events.filter(e => new Date(e.timestamp).getFullYear() === year - 1);
  const pm = month === 0 ? 11 : month - 1;
  const py = month === 0 ? year - 1 : year;
  return filterMonth(events, pm, py);
}

function computeDashboard(current, prev) {
  const n = current.length;

  /* Location */
  const lc = {};
  current.forEach(e => { if (e.location) lc[e.location] = (lc[e.location] || 0) + 1; });
  const topLoc  = topEntry(lc);
  const locPct  = topLoc && n > 0 ? Math.round(topLoc[1] / n * 100) : 0;
  const locEvent = topLoc ? current.find(e => e.location === topLoc[0]) || null : null;

  /* Hour — 8 three-hour slots, each labeled with its first 2 hours */
  const hc = Array(8).fill(0);
  current.forEach(e => {
    const slot = Math.min(Math.floor(new Date(e.timestamp).getHours() / 3), 7);
    hc[slot]++;
  });
  const peakSlot  = n > 0 ? hc.indexOf(Math.max(...hc)) : 0;
  const peakPct   = n > 0 ? Math.round(hc[peakSlot] / n * 100) : 0;
  const ps        = peakSlot * 3;
  const peakRange = `${String(ps).padStart(2,'0')}:00 - ${String(ps + 2).padStart(2,'0')}:00`;
  const peakEvent = current.find(e => Math.min(Math.floor(new Date(e.timestamp).getHours() / 3), 7) === peakSlot) || null;

  /* Intensity (modal rating) */
  const rc = {};
  current.forEach(e => { const r = e.rating || 1; rc[r] = (rc[r] || 0) + 1; });
  const topRating  = topEntry(rc);
  const ratingVal  = topRating ? Number(topRating[0]) : 0;
  const ratingPct  = topRating && n > 0 ? Math.round(topRating[1] / n * 100) : 0;
  const ratingEvent = current.find(e => (e.rating || 1) === ratingVal) || null;

  /* Types */
  const tyc = {};
  current.forEach(e => (e.types || []).forEach(t => { tyc[t] = (tyc[t] || 0) + 1; }));
  const topTypes = Object.entries(tyc).sort(([,a],[,b]) => b - a).slice(0, 3).map(([t, c]) => [t, c, n > 0 ? Math.round(c / n * 100) : 0]);
  const typesPct = topTypes[0]?.[2] ?? 0;

  /* Comparison */
  const pn = prev.length;
  let compDir = null, compPct = null;
  if (pn > 0) {
    const diff = n - pn;
    compPct = Math.abs(Math.round(diff / pn * 100));
    compDir = diff >= 0 ? 'עלייה' : 'ירידה';
  } else if (n > 0) { compPct = 100; compDir = 'עלייה'; }

  return {
    n,
    location:   { name: topLoc?.[0] ?? null, pct: locPct,   event: locEvent   },
    hour:       { bars: hc, peakSlot, peakRange, pct: peakPct, event: peakEvent },
    intensity:  { rating: ratingVal, pct: ratingPct, event: ratingEvent },
    types:      { list: topTypes, pct: typesPct },
    comparison: { dir: compDir, pct: compPct },
  };
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ChevronLeft({ color = '#323232' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

/* ── Dot spinner (loading screen) ── */
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

/* ── Empty mandala (welcome screen) ── */
const EMPTY_C = '#E7E4D4';
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

/* ════════════════════════════════
   Dashboard cards
════════════════════════════════ */

/* Card 1 — Most active space + 10×3 mandala grid */
function LocationCard({ data }) {
  const { name, pct, event } = data.location;
  const filled    = Math.round(pct / 100 * 30);
  const color     = event?.color || '#183497';
  const tod       = event ? getTimeOfDay(event.timestamp) : 'morning';
  const intensity = event?.rating || 3;

  return (
    <div style={{ background: '#F2EFE3', borderRadius: 16, padding: '18px 18px 22px', direction: 'rtl' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A' }}>המרחב הפעיל ביותר</span>
        <span style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 14, color: '#45423A' }}>{pct}%</span>
      </div>
      {name && (
        <p style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 13, color: '#45423A', margin: '0 0 18px', textAlign: 'right' }}>
          {name}
        </p>
      )}
      {/* 10×3 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, direction: 'rtl' }}>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30 }}>
            {i < filled
              ? <Mandala timeOfDay={tod} intensity={intensity} color={color} size={24} />
              : <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#DAD5C1' }} />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 2 — Most common hour + bar chart */
function HourCard({ data }) {
  const { bars, peakSlot, peakRange, pct, event } = data.hour;
  const maxVal      = Math.max(...bars, 1);
  const accentColor = event?.color || '#183497';

  return (
    <div style={{ background: '#F2EFE3', borderRadius: 16, padding: '18px 18px 22px', direction: 'rtl' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A' }}>השעה הנפוצה ביותר</span>
        <span style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 14, color: '#45423A' }}>{pct}%</span>
      </div>
      <p style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 13, color: '#45423A', margin: '0 0 20px', textAlign: 'right', direction: 'ltr' }}>
        {peakRange}
      </p>
      {/* Bar chart — ltr so bars go left→right */}
      <div style={{ direction: 'ltr' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 110 }}>
          {bars.map((count, i) => (
            <div key={i} style={{
              width: 13,
              height: `${Math.max(4, Math.round(count / maxVal * 100))}%`,
              borderRadius: 6.5,
              background: i === peakSlot ? accentColor : '#E7E4D4',
            }} />
          ))}
        </div>
        {/* X-axis: every bar gets a 2-line label showing slot-start and slot-start+2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, borderTop: '1px solid #D4D1C3', paddingTop: 5 }}>
          {bars.map((_, i) => (
            <div key={i} style={{ width: 13, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: '8pt', color: '#87837A', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
                {String(i * 3).padStart(2,'0')}:00
              </span>
              <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: '8pt', color: '#87837A', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
                {String(i * 3 + 2).padStart(2,'0')}:00
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Card 3 — Average intensity + mandala */
function IntensityCard({ data }) {
  const { rating, pct, event } = data.intensity;
  const color = event?.color || '#183497';
  const tod   = event ? getTimeOfDay(event.timestamp) : 'morning';

  return (
    <div style={{ background: '#F2EFE3', borderRadius: 16, padding: '18px 14px 22px', direction: 'rtl', flex: '0 0 auto', width: 'calc(54% - 6px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A' }}>עוצמה ממוצעת</span>
        <span style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 14, color: '#45423A' }}>{pct}%</span>
      </div>
      <p style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 13, color: '#45423A', margin: '0 0 16px', textAlign: 'right' }}>
        דרגה {rating || '—'}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
        <Mandala timeOfDay={tod} intensity={rating || 3} color={color} size={125} />
      </div>
    </div>
  );
}

/* Card 4 — Most common event types + chips */
function TypesCard({ data }) {
  const { list } = data.types;

  return (
    <div style={{ background: '#F2EFE3', borderRadius: 16, padding: '18px 14px 22px', direction: 'rtl', flex: 1 }}>
      <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A', lineHeight: '18px', display: 'block', marginBottom: 14 }}>
        סוגי האירועים<br />הכי נפוצים
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {list.length > 0
          ? list.map(([type, , typePct], i) => (
            <div key={type}>
              {i > 0 && <div style={{ height: 1, background: '#D4D1C3' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#45423A' }}>{type}</span>
                <span style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 13, color: '#45423A' }}>{typePct}%</span>
              </div>
            </div>
          ))
          : <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 12, color: '#45423A', margin: 0, textAlign: 'center' }}>אין נתונים</p>
        }
      </div>
    </div>
  );
}

/* Summary overlay — bottom sheet with lorem ipsum placeholder */
export function SummaryOverlay({ viewMode, month, year, onClose }) {
  const title = viewMode === 'חודש' ? `סיכום ${MONTHS_HE[month]} ${year}` : `סיכום ${year}`;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(28,28,28,0.55)' }} />
      <div style={{
        position: 'relative',
        background: '#F8F5EE',
        borderRadius: 20, padding: '24px 24px 32px',
        direction: 'rtl', display: 'flex', flexDirection: 'column', gap: 16,
        width: 353, maxHeight: '80%', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={iBtn}><XIcon /></button>
          </div>
          <span style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 18, color: '#45423A' }}>{title}</span>
        </div>
        {viewMode === 'חודש' ? (
          <>
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#45423A', lineHeight: '23px', margin: 0 }}>
              במהלך חודש יולי תיעדת 82 אירועים. מתוך כלל האירועים שתועדו, 78% התרחשו בבית, ורובם תועדו בין השעות 06:00–08:00. העוצמה הממוצעת של האירועים הייתה 3, וסוג האירוע הנפוץ ביותר היה סערה. בהשוואה לחודש הקודם נרשמה ירידה של 45% במספר האירועים שתועדו.
            </p>
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#777366', lineHeight: '21px', margin: 0 }}>
              הסיכום מבוסס על האירועים שתיעדת במהלך החודש, והוא מתעדכן באופן אוטומטי עם כל אירוע חדש שנוסף.
            </p>
          </>
        ) : (
          <>
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#45423A', lineHeight: '28px', margin: 0 }}>
              במהלך שנת 2026 תיעדת 87 אירועים. רובם התרחשו בעבודה (55%), בעיקר בין השעות 08:00–06:00. העוצמה הממוצעת של האירועים הייתה 3, וסוג האירוע הנפוץ ביותר היה כאב.
            </p>
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#45423A', lineHeight: '24px', margin: 0 }}>
              הסיכום מבוסס על האירועים שתיעדת במהלך השנה, והוא מתעדכן באופן אוטומטי עם כל אירוע חדש שנוסף.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   InsightsFlow
════════════════════════════════ */
export default function InsightsFlow({ onClose, onShowSummary }) {
  const allEvents = FAKE_HISTORICAL_EVENTS;
  const now        = new Date();
  const touchStart = useRef(null);

  const [loading,     setLoading]     = useState(true);
  const [welcome,     setWelcome]     = useState(false);
  const [fadeIn,      setFadeIn]      = useState(false);
  const [viewMode,    setViewMode]    = useState('חודש');
  const [month,       setMonth]       = useState(now.getMonth());
  const [year,        setYear]        = useState(now.getFullYear());
  const [animKey,     setAnimKey]     = useState(0);
  const [slideDir,    setSlideDir]    = useState('left');
  const navRef = useRef(null);

  /* Auto-dismiss loading → welcome */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setWelcome(true);
      requestAnimationFrame(() => setFadeIn(true));
      try { const a = new Audio('/sound-036.mp3'); a.volume = 0.4; a.play(); } catch (_) {}
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
    setSlideDir('right');
    setAnimKey(k => k + 1);
    if (viewMode === 'שנה') { setYear(y => y - 1); return; }
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function goNext() {
    if (isCurrent) return;
    setSlideDir('left');
    setAnimKey(k => k + 1);
    if (viewMode === 'שנה') { setYear(y => y + 1); return; }
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  /* Keep navRef current so window listeners always call the latest goPrev/goNext */
  navRef.current = { goPrev, goNext };

  /* Window-level release handlers — fire even when pointer leaves the element */
  useEffect(() => {
    function onMouseUp(e) {
      if (!touchStart.current) return;
      const dx = e.clientX - touchStart.current.x;
      const dy = e.clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
        dx > 0 ? navRef.current.goNext() : navRef.current.goPrev();
      touchStart.current = null;
    }
    function onTouchEnd(e) {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
        dx > 0 ? navRef.current.goNext() : navRef.current.goPrev();
      touchStart.current = null;
    }
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  /* Swipe start — just record position, no capture */
  const swipeHandlers = {
    onMouseDown:  e => { touchStart.current = { x: e.clientX, y: e.clientY }; },
    onTouchStart: e => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; },
  };

  /* Compute dashboard data for current period */
  const periodEvents = filterPeriod(allEvents, viewMode, month, year);
  const prevEvents   = filterPrevPeriod(allEvents, viewMode, month, year);
  const dash         = computeDashboard(periodEvents, prevEvents);

  const { dir: compDir, pct: compPct } = dash.comparison;
  const compPrevLabel = viewMode === 'שנה' ? 'שנה שעברה' : 'חודש שעבר';

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: '#F8F5EE', alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <DotSpinner />
        <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#45423A', margin: 0, direction: 'rtl' }}>
          מכין את התובנות שלך...
        </p>
      </div>
    );
  }

  /* ── Welcome ── */
  if (welcome) {
    return (
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#F8F5EE', alignItems: 'center', justifyContent: 'center',
          gap: 22, paddingBottom: 15,
          opacity: fadeIn ? 1 : 0, transition: 'opacity 0.3s ease',
        }}
        {...swipeHandlers}
      >
        <EmptyMandala size={265} />
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 20, color: '#45423A',
          textAlign: 'center', direction: 'rtl', lineHeight: '28px',
          margin: 0, padding: '0 40px', whiteSpace: 'pre-line',
        }}>
          {`עד כה תיעדת ${allEvents.length} אירועים.\n`}
          <span style={{ fontWeight: 500 }}>החלק שמאלה</span>
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

  /* ── Dashboard ── */
  return (
    <div
      style={{
        flex: 1, overflowY: 'auto', background: '#F8F5EE',
        opacity: fadeIn ? 1 : 0, transition: 'opacity 0.3s ease',
        position: 'relative',
      }}
      className="hide-scrollbar"
      {...swipeHandlers}
    >
      {/* ── Header: X left, event count + title right ── */}
      <div style={{ display: 'flex', direction: 'ltr', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 20px 0' }}>
        <button onClick={onClose} style={iBtn}><XIcon /></button>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A', margin: '0 0 3px',
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4,
          }}>
            <span>אירועים</span>
            <span>{periodEvents.length}</span>
          </p>
          <p style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 20, color: '#45423A', margin: 0 }}>
            הדפוסים שלי
          </p>
        </div>
      </div>

      {/* ── Toggle: stroke-only style ── */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '21px 0 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', direction: 'rtl',
          width: 220, height: 42, borderRadius: 30,
          border: '1.5px solid rgba(69,66,58,0.3)',
          boxSizing: 'border-box', padding: 3, gap: 2,
        }}>
          {['חודש','שנה'].map(v => {
            const active = viewMode === v;
            return (
              <button key={v} onClick={() => setViewMode(v)} style={{
                flex: 1, height: 34, borderRadius: 24,
                border: active ? '1.5px solid #45423A' : '1.5px solid transparent',
                background: 'transparent',
                color: active ? '#45423A' : '#87837A',
                fontFamily: 'Atlas', fontWeight: active ? 700 : 400, fontSize: 13,
                cursor: 'pointer',
              }}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* ── Period navigator ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '27px 24px 0',
      }}>
        <button onClick={goNext} style={{ ...iBtn, opacity: isCurrent ? 0.25 : 1, cursor: isCurrent ? 'default' : 'pointer' }}>
          <ChevronLeft />
        </button>
        <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#323232', textAlign: 'center' }}>
          {viewMode === 'שנה' ? year : `${MONTHS_HE[month]} ${year}`}
        </span>
        <button onClick={goPrev} style={iBtn}>
          <ChevronRight />
        </button>
      </div>

      {/* ── Animated content: cards + comparison + summary ── */}
      <div
        key={animKey}
        style={{ animation: `${slideDir === 'left' ? 'slideFromLeft' : 'slideFromRight'} 0.3s ease` }}
      >

        {/* ── Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '38px 16px 0' }}>
          <LocationCard data={dash} />
          <HourCard data={dash} />
          <div style={{ display: 'flex', gap: 10, direction: 'rtl' }}>
            <TypesCard data={dash} />
            <IntensityCard data={dash} />
          </div>
        </div>

        {/* ── Comparison text ── */}
        <div style={{ padding: '44px 28px 0', direction: 'rtl', textAlign: 'center' }}>
          {compDir ? (
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 18, color: '#45423A', margin: 0, lineHeight: '23px' }}>
              בהשוואה ל{compPrevLabel} נרשמה {compDir} של{' '}
              <span style={{ fontWeight: 700 }}>{compPct}%</span>
              {' '}במספר האירועים שתועדו
            </p>
          ) : (
            <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 16, color: '#87837A', margin: 0 }}>
              אין נתונים להשוואה לתקופה הקודמת
            </p>
          )}
        </div>

        {/* ── Summary button ── */}
        <div style={{ padding: '20px 16px 40px' }}>
          <button
            onClick={() => onShowSummary({ viewMode, month, year })}
            style={{
              width: '100%', padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              direction: 'rtl', borderRadius: 30,
              border: '1.5px solid #45423A', background: '#45423A',
              fontFamily: 'Atlas', fontWeight: 500, fontSize: 15, color: '#F8F5EE',
              cursor: 'pointer',
            }}
          >
            <span>{viewMode === 'חודש' ? 'סיכום חודשי' : 'סיכום שנתי'}</span>
            <ChevronLeft color="#F8F5EE" />
          </button>
        </div>

      </div>

    </div>
  );
}

const iBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
