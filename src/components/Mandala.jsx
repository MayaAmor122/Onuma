/* ── Mandala shapes — reconstructed from the 5 reference SVGs ──
   Each shape: an optional thin ring + 1-3 concentric dot rings.
   The center dot's radius represents intensity (1-5).             */
const SHAPES = {
  morning: {
    viewBox: 81,
    ring: { radius: 12.17, strokeWidth: 2 },
    dotRings: [
      { radius: 20.95, dotR: 2.79, count: 18 },
      { radius: 33.37, dotR: 6.18, count: 9  },
    ],
    centerRadii: [2.90, 4.83, 6.76, 9.17, 13.52],
  },
  noon: {
    viewBox: 80,
    ring: { radius: 24.56, strokeWidth: 3 },
    dotRings: [
      { radius: 15.78, dotR: 2.92, count: 9  },
      { radius: 35.05, dotR: 4.67, count: 18 },
    ],
    centerRadii: [3.02, 5.03, 7.05, 9.57, 11.96],
  },
  afternoon: {
    viewBox: 81,
    ring: { radius: 24.44, strokeWidth: 4 },
    dotRings: [
      { radius: 35.06, dotR: 4.67, count: 18 },
    ],
    centerRadii: [2.93, 4.89, 7.33, 9.28, 13.68],
  },
  evening: {
    viewBox: 81,
    ring: null,
    dotRings: [
      { radius: 11.52, dotR: 1.83, count: 14 },
      { radius: 19.83, dotR: 4.22, count: 13 },
      { radius: 32.52, dotR: 6.91, count: 13 },
    ],
    centerRadii: [2.90, 4.34, 5.79, 7.24, 9.19],
  },
  night: {
    viewBox: 81,
    ring: null,
    dotRings: [
      { radius: 19.56, dotR: 2.61, count: 26 },
      { radius: 33.36, dotR: 6.18, count: 19 },
    ],
    centerRadii: [2.95, 4.91, 7.37, 9.82, 13.75],
  },
};

function polarPoints(radius, count) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
    pts.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
  }
  return pts;
}

/* ── timeOfDay: 'morning'|'noon'|'afternoon'|'evening'|'night'
     intensity: 1-5
     color: hex fill applied to every dot + the thin ring          */
export default function Mandala({ timeOfDay = 'morning', intensity = 1, color = '#183497', size = 60 }) {
  const shape = SHAPES[timeOfDay] || SHAPES.morning;
  const { viewBox, ring, dotRings, centerRadii } = shape;
  const level = Math.min(Math.max(intensity, 1), 5);
  const centerR = centerRadii[level - 1];
  const half = viewBox / 2;

  return (
    <svg width={size} height={size} viewBox={`${-half} ${-half} ${viewBox} ${viewBox}`}>
      {ring && (
        <circle cx={0} cy={0} r={ring.radius} fill="none" stroke={color} strokeWidth={ring.strokeWidth} />
      )}
      {dotRings.map((dr, i) => (
        polarPoints(dr.radius, dr.count).map((p, j) => (
          <circle key={`${i}-${j}`} cx={p.x} cy={p.y} r={dr.dotR} fill={color} />
        ))
      ))}
      <circle cx={0} cy={0} r={centerR} fill={color} />
    </svg>
  );
}

/* ── Time-of-day bucket helper ── */
export function getTimeOfDay(ts) {
  const h = new Date(ts).getHours();
  if (h >= 5  && h < 12) return 'morning';
  if (h >= 12 && h < 15) return 'noon';
  if (h >= 15 && h < 18) return 'afternoon';
  if (h >= 18 && h < 21) return 'evening';
  return 'night';
}
