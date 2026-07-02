import { useApp } from '../context/AppContext';
import { useRef, useState, useEffect, useMemo } from 'react';

/* ── Geometry ── */
const CX         = 150;
const CY         = 150;
const OUTER_R    = 143;
const INNER_R    = 95;
const UNIT_DEG   = 3.6;
const BASE_GAP   = 2.0;
const ZOOM_SIGMA = 50;   // degrees — Gaussian width for hover influence
const MAX_ZOOM   = 6;
const MAX_DEEP   = 10;

/* ── Helpers ── */
function angularDist(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}
function polarXY(r, deg) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function makeArcPath(startDeg, endDeg, outerR, innerR, gap) {
  if (outerR <= innerR + 0.5) return null;
  const end = endDeg - gap;
  if (end <= startDeg + 0.05) return null;
  const o1 = polarXY(outerR, startDeg), o2 = polarXY(outerR, end);
  const i1 = polarXY(innerR, startDeg), i2 = polarXY(innerR, end);
  const lg = (end - startDeg) > 180 ? 1 : 0;
  return [
    `M ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${lg} 1 ${o2.x.toFixed(2)} ${o2.y.toFixed(2)}`,
    `L ${i2.x.toFixed(2)} ${i2.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${lg} 0 ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

/* ── Window membership test ──
   Returns true if `angle` falls inside [winStart, winStart + winDeg). */
function inWindow(angle, winStart, winDeg) {
  if (winDeg <= 0) return false;
  const norm = a => ((a % 360) + 360) % 360;
  const s = norm(winStart);
  const e = norm(winStart + winDeg);
  if (s < e) return angle >= s && angle < e;
  return angle >= s || angle < e; // window wraps through 0°
}

/* ── Layer split ── */
function splitLayers(events) {
  if (!events.length) return { current: [], deeper: [] };
  let total = 0, splitIdx = 0;
  for (let i = events.length - 1; i >= 0; i--) {
    total += events[i].intensity * UNIT_DEG;
    if (total > 360) { splitIdx = i + 1; break; }
  }
  return { current: events.slice(splitIdx), deeper: events.slice(0, splitIdx) };
}

/* ── Gaussian zoom (full ring only — total stays 360°) ── */
function applyZoom(baseAngles, hoverAngle, zoomLevel) {
  if (zoomLevel <= 1 || hoverAngle === null) return baseAngles;
  const mids = []; let c = 0;
  baseAngles.forEach(a => { mids.push(c + a / 2); c += a; });
  const weights = mids.map(mid => {
    const d = angularDist(mid, hoverAngle);
    return 1 + (zoomLevel - 1) * Math.exp(-d * d / (2 * ZOOM_SIGMA * ZOOM_SIGMA));
  });
  const wTotal = baseAngles.reduce((s, a, i) => s + a * weights[i], 0);
  const norm   = 360 / wTotal;
  return baseAngles.map((a, i) => a * weights[i] * norm);
}

/* ── Build current-layer segments ──
   When ring is full and older events exist, a window opens at hoverAngle.
   Current events whose midpoint falls inside that window are suppressed —
   the grey track shows through, and deep events fill that exact gap.     */
function buildCurSegments(events, spaceMap, hoverAngle, zoomLevel,
                          outerR, innerR, isFull, hasDeepEvents) {
  if (!events.length) return [];
  const natural    = events.map(e => e.intensity * UNIT_DEG);
  const total      = natural.reduce((a, b) => a + b, 0);
  const baseAngles = natural.map(a => (total > 360 ? a * 360 / total : a));
  const finalAngles = isFull
    ? applyZoom(baseAngles, hoverAngle, zoomLevel)
    : baseAngles;

  // Window opens only when ring is full AND there is something to reveal
  const windowDeg = (isFull && hasDeepEvents && hoverAngle !== null && zoomLevel > 1)
    ? Math.min(80, (zoomLevel - 1) * 32)
    : 0;
  const winStart = (hoverAngle - windowDeg / 2 + 360) % 360;

  // Gap shrinks to 0 on a seamless full ring, grows back as zoom opens
  const gap = isFull ? Math.min(BASE_GAP, (zoomLevel - 1) * 1.8) : BASE_GAP;

  const segs = []; let cursor = 0;
  events.forEach((evt, i) => {
    const mid = (cursor + finalAngles[i] / 2) % 360;
    if (!inWindow(mid, winStart, windowDeg)) {
      const path = makeArcPath(cursor, cursor + finalAngles[i], outerR, innerR, gap);
      if (path) segs.push({ id: evt.id, path, color: spaceMap[evt.spaceId]?.color ?? '#888888' });
    }
    cursor += finalAngles[i];
  });
  return segs;
}

/* ── Build deep-layer segments ──
   Older events fill the window gap in the SAME ring band (outerR → innerR).
   No separate inner ring — everything lives on one band.                 */
function buildDeepSegments(deepEvents, spaceMap, hoverAngle, zoomLevel, outerR, innerR) {
  if (!deepEvents.length || hoverAngle === null || zoomLevel <= 1.05) return [];
  const windowDeg = Math.min(80, (zoomLevel - 1) * 32);
  if (windowDeg < 2) return [];

  const evts     = deepEvents.slice(-MAX_DEEP);
  const natural  = evts.map(e => e.intensity * UNIT_DEG);
  const totalNat = natural.reduce((a, b) => a + b, 0);
  if (totalNat <= 0) return [];

  const scale    = windowDeg / totalNat;
  const winStart = (hoverAngle - windowDeg / 2 + 360) % 360;
  const gap      = windowDeg > 18 ? 1.5 : 0;
  const segs     = []; let cursor = winStart;
  evts.forEach(evt => {
    const angle = evt.intensity * UNIT_DEG * scale;
    const path  = makeArcPath(cursor, cursor + angle, outerR, innerR, gap);
    if (path) segs.push({ id: `d-${evt.id}`, path, color: spaceMap[evt.spaceId]?.color ?? '#888888' });
    cursor += angle;
  });
  return segs;
}

/* ════════════════════════════════
   Component
════════════════════════════════ */
export default function DonutRing({ onAddEvent }) {
  const { events, spaces } = useApp();

  const spaceMap = useMemo(
    () => Object.fromEntries(spaces.map(s => [s.id, s])), [spaces]
  );
  const { current: curEvents, deeper: deepEvents } = useMemo(
    () => splitLayers(events), [events]
  );
  const isFull = useMemo(
    () => curEvents.reduce((s, e) => s + e.intensity * UNIT_DEG, 0) >= 360,
    [curEvents]
  );

  /* ── Interaction ── */
  const [hoverAngle, setHoverAngle] = useState(null);
  const [zoomLevel,  setZoomLevel]  = useState(1);
  const hoverRef     = useRef(null);
  const containerRef = useRef(null);

  /* ── Segments ── */
  const curSegs = useMemo(
    () => buildCurSegments(
      curEvents, spaceMap, hoverAngle, zoomLevel,
      OUTER_R, INNER_R, isFull, deepEvents.length > 0
    ),
    [curEvents, spaceMap, hoverAngle, zoomLevel, isFull, deepEvents.length]
  );

  const deepSegs = useMemo(
    () => buildDeepSegments(deepEvents, spaceMap, hoverAngle, zoomLevel, OUTER_R, INNER_R),
    [deepEvents, spaceMap, hoverAngle, zoomLevel]
  );

  /* ── Non-passive wheel ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e) {
      if (hoverRef.current === null) return;
      e.preventDefault();
      setZoomLevel(z => Math.max(1, Math.min(MAX_ZOOM, z - e.deltaY * 0.006)));
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  /* ── Mouse ── */
  function handleMouseMove(e) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    const svgDist = Math.hypot(dx, dy) / (rect.width / 300);
    if (svgDist >= INNER_R && svgDist <= OUTER_R) {
      const angle = ((Math.atan2(dy, dx) * 180 / Math.PI) + 90 + 360) % 360;
      hoverRef.current = angle;
      setHoverAngle(angle);
    } else {
      hoverRef.current = null;
      setHoverAngle(null);
    }
  }
  function handleMouseLeave() {
    hoverRef.current = null;
    setHoverAngle(null);
    setZoomLevel(1);
  }

  /* ── Derived visuals ── */
  const deepOpacity = deepEvents.length > 0 && hoverAngle !== null
    ? Math.min(1, Math.max(0, (zoomLevel - 1.1) / 0.7))
    : 0;
  const btnBgAlpha = Math.max(0, Math.min(1, 1 - (zoomLevel - 1.2) / 0.9));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>

      <p style={{
        fontSize: 13, color: '#aaaaaa', letterSpacing: '0.1px',
        opacity: isFull ? 1 : 0, transition: 'opacity 0.5s ease',
        height: 18, userSelect: 'none',
      }}>
        Zoom in to reveal deeper layers.
      </p>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', width: 300, height: 300,
          cursor: hoverAngle !== null ? 'zoom-in' : 'default',
        }}
      >
        <svg viewBox="0 0 300 300" width="300" height="300" style={{ overflow: 'visible' }}>

          {/* Ring background track */}
          <circle cx={CX} cy={CY}
            r={(OUTER_R + INNER_R) / 2}
            stroke="#e4e4e4" strokeWidth={OUTER_R - INNER_R} fill="none"
          />

          {/* Deep events — appear inside the gap, same ring band */}
          <g opacity={deepOpacity} style={{ transition: 'opacity 0.2s ease' }}>
            {deepSegs.map(s => (
              <path key={s.id} d={s.path} fill={s.color} opacity={0.75} />
            ))}
          </g>

          {/* Current events */}
          {curSegs.map(s => (
            <path key={s.id} d={s.path} fill={s.color} style={{ cursor: 'pointer' }} />
          ))}
        </svg>

        {/* Center button */}
        <button
          onClick={zoomLevel <= 1.5 ? onAddEvent : undefined}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 183, height: 183, borderRadius: '50%',
            background: `rgba(242,242,247,${btnBgAlpha})`,
            border: 'none',
            cursor: zoomLevel <= 1.5 ? 'pointer' : 'default',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 4, padding: 0,
            pointerEvents: hoverAngle !== null ? 'none' : 'auto',
          }}
        >
          <span style={{ fontSize: 26, color: '#999999', lineHeight: 1, fontWeight: 300,
            opacity: btnBgAlpha, transition: 'opacity 0.2s' }}>+</span>
          <span style={{ fontSize: 12, color: '#999999', textAlign: 'center',
            lineHeight: 1.35, letterSpacing: '0.1px',
            opacity: btnBgAlpha, transition: 'opacity 0.2s' }}>
            Add new<br />compulsion
          </span>
        </button>
      </div>
    </div>
  );
}
