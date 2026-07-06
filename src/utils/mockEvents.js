/* Sample events for the walkthrough background — always full of color,
   regardless of the real app's actual event count.                  */
const COLORS = ['#183497', '#FFDB60', '#FFC8CE', '#B6CDFF'];
const HOURS  = [7, 13, 16, 19, 23]; // one representative hour per time-of-day bucket
const COUNT  = 260; // enough to fill even the densest (year) zoom level

/* Deterministic seeded PRNG (mulberry32) — looks random, stays stable across renders */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

export const MOCK_EVENTS = Array.from({ length: COUNT }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  date.setHours(HOURS[Math.floor(rand() * HOURS.length)], 0, 0, 0);

  return {
    id: `mock-${i}`,
    text: '',
    color: COLORS[Math.floor(rand() * COLORS.length)],
    rating: Math.floor(rand() * 5) + 1,
    timestamp: date.toISOString(),
    location: null,
    types: [],
  };
});
