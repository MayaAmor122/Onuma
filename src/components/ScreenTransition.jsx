import { useState, useRef, useEffect, useLayoutEffect } from 'react';

const SLIDE_DURATION = 300;
const FADE_DURATION  = 250;

/* ── 2-slot reveal fade:
   New screen mounts at opacity:1 BENEATH the old screen (zIndex:1 vs 2).
   After 80ms (enough time for the new screen to fully initialize its
   spotlight / card positions), the old screen fades out to reveal it.
   No compound-opacity issues, no "unready" flash.                       ── */
function FadeTransition({ screenKey, children }) {
  const [active, setActive] = useState('a');
  const [slotA,  setSlotA]  = useState(children);
  const [slotB,  setSlotB]  = useState(null);
  const [fading, setFading]  = useState(false); // true while old slot fades out
  const activeRef = useRef('a');
  const prevKey   = useRef(screenKey);
  const t1 = useRef(null);
  const t2 = useRef(null);

  useEffect(() => {
    if (screenKey === prevKey.current) return;
    prevKey.current = screenKey;

    clearTimeout(t1.current);
    clearTimeout(t2.current);

    const prev = activeRef.current;
    const next = prev === 'a' ? 'b' : 'a';

    // Mount new screen in the inactive slot (sits beneath current screen, opacity:1)
    if (next === 'b') setSlotB(children);
    else              setSlotA(children);

    // Wait for the new screen to fully initialize (spotlight, card positions…)
    // then fade out the old screen to reveal it
    t1.current = setTimeout(() => {
      setFading(true);
      t2.current = setTimeout(() => {
        activeRef.current = next;
        setActive(next);
        setFading(false);
        if (prev === 'a') setSlotA(null);
        else              setSlotB(null);
      }, FADE_DURATION + 30);
    }, 80);
  }, [screenKey]);

  const renderSlot = (content, id) => {
    if (!content) return null;
    const isCurrent = active === id; // the outgoing (old) screen during fade
    return (
      <div
        key={`slot-${id}`}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          // During fade: old (isCurrent) sits on top and fades to 0;
          //              new (!isCurrent) sits below at opacity:1, already ready
          zIndex:       isCurrent ? 2 : 1,
          opacity:      fading && isCurrent ? 0 : 1,
          transition:   fading && isCurrent ? `opacity ${FADE_DURATION}ms ease` : 'none',
          pointerEvents: isCurrent && !fading ? 'auto' : 'none',
        }}
      >
        {content}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      {renderSlot(slotA, 'a')}
      {renderSlot(slotB, 'b')}
    </div>
  );
}

/* ── Slide transition: snapshot the old screen, slide both simultaneously ── */
function SlideTransition({ screenKey, direction, children }) {
  const [phase, setPhase] = useState('stable');
  const [prev,  setPrev]  = useState(null);
  const prevKeyRef  = useRef(screenKey);
  const prevNodeRef = useRef(children);
  const timerRef    = useRef(null);
  const rafRef      = useRef(null);

  // useLayoutEffect fires before paint so we jump to 'ready' before the
  // browser ever shows the new screen in 'stable' (which causes a double-jump).
  useLayoutEffect(() => {
    if (screenKey === prevKeyRef.current) return;

    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);

    const capturedKey  = prevKeyRef.current;
    const capturedNode = prevNodeRef.current;
    prevKeyRef.current = screenKey;

    setPrev({ key: capturedKey, node: capturedNode });
    setPhase('ready');

    rafRef.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setPhase('animating');
        timerRef.current = setTimeout(() => {
          setPrev(null);
          setPhase('stable');
        }, SLIDE_DURATION + 30);
      })
    );
  }, [screenKey]);

  useLayoutEffect(() => { prevNodeRef.current = children; });

  const fwd  = direction !== 'back';
  const base = { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' };

  // RTL: forward → current exits right (+25% parallax), new enters from left
  const tr     = phase === 'animating' ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.32,0.72,0,1)` : 'none';
  const exitX  = phase === 'animating' ? (fwd ? '25%' : '-100%') : '0%';
  const enterX = phase === 'stable'    ? '0%'
               : phase === 'animating' ? '0%'
               :                         (fwd ? '-100%' : '25%');

  // Always keep key="in-{screenKey}" so the current screen is never remounted
  // when the phase flips back to stable — this preserves CSS animations on children.
  return (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      {prev && (
        <div key={`out-${prev.key}`} style={{ ...base, zIndex: 1, transform: `translateX(${exitX})`, transition: tr }}>
          {prev.node}
        </div>
      )}
      <div key={`in-${screenKey}`} style={{ ...base, zIndex: 2, transform: `translateX(${enterX})`, transition: tr }}>
        {children}
      </div>
    </div>
  );
}

export default function ScreenTransition({ screenKey, direction = 'forward', type = 'slide', children }) {
  if (type === 'fade') {
    return <FadeTransition screenKey={screenKey}>{children}</FadeTransition>;
  }
  return <SlideTransition screenKey={screenKey} direction={direction}>{children}</SlideTransition>;
}
