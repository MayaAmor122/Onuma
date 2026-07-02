import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Mandala, { getTimeOfDay } from '../components/Mandala';

/* ── Date helpers ── */
const MONTHS_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const DAYS_HE   = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const ORDINALS  = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שביעי','שמיני','תשיעי','עשירי'];

function formatTimestamp(iso) {
  const d     = new Date(iso);
  const day   = DAYS_HE[d.getDay()];
  const date  = d.getDate();
  const month = MONTHS_HE[d.getMonth()];
  const year  = d.getFullYear();
  const hh    = String(d.getHours()).padStart(2, '0');
  const mm    = String(d.getMinutes()).padStart(2, '0');
  return `יום ${day}, ${date} ${month} ${year} | ${hh}:${mm}`;
}

/* ── Insight generator ── */
function generateInsight(event, allEvents) {
  if (!event.types || event.types.length === 0) return null;
  const primaryType = event.types[0];
  const eventDate   = new Date(event.timestamp);

  const weekStart = new Date(eventDate);
  weekStart.setDate(eventDate.getDate() - eventDate.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const count = allEvents.filter(e => {
    const d = new Date(e.timestamp);
    return d >= weekStart && d <= eventDate && e.types && e.types.includes(primaryType);
  }).length;

  if (count === 0) return null;
  const ordinal = count <= ORDINALS.length ? ORDINALS[count - 1] : `ה-${count}`;
  return `זהו האירוע ה${ordinal} שסומן כ"${primaryType}" השבוע.`;
}

/* ── Waveform bars (shown when playing) ── */
const BAR_HEIGHTS = [6, 14, 20, 10, 18, 22, 8, 16, 20, 12, 18, 6];
function Waveform() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 22 }}>
      {BAR_HEIGHTS.map((h, i) => (
        <div key={i} style={{
          width: 2, height: h, borderRadius: 2, background: '#323232',
          transformOrigin: 'center',
          animation: `waveBar ${0.45 + (i % 3) * 0.15}s ease-in-out ${i * 0.06}s infinite alternate`,
        }} />
      ))}
    </div>
  );
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
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
function MicIcon({ size = 14, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8"  y1="23" x2="16" y2="23"/>
    </svg>
  );
}

/* ── Info tag chip ── */
function InfoTag({ width, children }) {
  return (
    <span style={{
      width, height: 40, borderRadius: 30, background: '#EBE8DB',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#323232',
      whiteSpace: 'nowrap', flexShrink: 0, boxSizing: 'border-box',
    }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function EventDetailScreen({ event, onClose }) {
  const { events } = useApp();
  const [playing, setPlaying] = useState(false);
  const [docOpen, setDocOpen] = useState(false);

  const eventNumber = events.findIndex(e => e.id === event.id) + 1;
  const insight     = generateInsight(event, events);
  const hasAudio    = !!event.audio;
  const hasLocation = !!event.location;
  const hasTypes    = event.types && event.types.length > 0;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar: X (left) · event number + timestamp (right) ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '36px 20px 0' }}>
        <button onClick={onClose} style={iconBtn}><CloseIcon /></button>
        <div style={{ textAlign: 'right', direction: 'rtl' }}>
          <p style={{ fontFamily: 'Atlas', fontWeight: 700, fontSize: 14, color: '#183497', margin: 0 }}>
            אירוע {eventNumber}
          </p>
          <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A', margin: '2px 0 0' }}>
            {formatTimestamp(event.timestamp)}
          </p>
        </div>
      </div>

      {/* ── Trigger row: audio chip (if any) + documentation dropdown ── */}
      <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', gap: 8, padding: '16px 20px 0' }}>
        {hasAudio && (
          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              display: 'flex', flexDirection: 'row', direction: 'rtl', alignItems: 'center', gap: 10,
              height: 48, padding: '0 8px 0 16px', borderRadius: 30,
              border: '1.5px solid #E2DFD0', background: '#F8F5EE',
              cursor: 'pointer', boxSizing: 'border-box', flexShrink: 0,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: '#323232',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <MicIcon size={14} color="#ffffff" />
            </div>
            {playing ? <Waveform /> : (
              <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#323232', whiteSpace: 'nowrap' }}>
                יש גם הקלטה
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setDocOpen(o => !o)}
          style={{
            flex: 1, height: 48, padding: '0 18px', borderRadius: 30,
            border: '1.5px solid #E2DFD0', background: '#F8F5EE',
            display: 'flex', flexDirection: 'row', direction: 'rtl',
            alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', boxSizing: 'border-box',
          }}
        >
          <span style={{ fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#323232' }}>
            תיעוד האירוע
          </span>
          {docOpen ? <ChevronDownIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {/* ── Documentation card — opens downward ── */}
      {docOpen && (
        <div style={{
          margin: '8px 20px 0', padding: 16, borderRadius: 20,
          border: '1.5px solid #E2DFD0', background: '#F8F5EE', direction: 'rtl',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontWeight: 400, fontSize: 15, color: '#323232',
            lineHeight: 1.5, margin: 0, textAlign: 'right',
          }}>
            {event.text || '—'}
          </p>
        </div>
      )}

      {/* ── Mandala ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mandala
          timeOfDay={getTimeOfDay(event.timestamp)}
          intensity={event.rating || 1}
          color={event.color || '#183497'}
          size={312.37}
        />
      </div>

      {/* ── Insight ── */}
      {insight && (
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 14, color: '#323232',
          textAlign: 'center', direction: 'rtl', margin: '0 24px 16px',
        }}>
          {insight}
        </p>
      )}

      {/* ── Tags ── */}
      <div style={{ padding: '0 20px 28px', direction: 'rtl' }}>
        <div style={{ display: 'flex', flexDirection: 'row', direction: 'rtl', justifyContent: 'flex-start', gap: 5, marginBottom: 8 }}>
          {hasLocation && <InfoTag width={214}>{`מיקום האירוע: ${event.location}`}</InfoTag>}
          <InfoTag width={134}>{`עוצמה: ${event.rating || 1}`}</InfoTag>
        </div>
        {hasTypes && (
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, direction: 'rtl' }}>
            {event.types.map(type => <InfoTag key={type} width={174}>{type}</InfoTag>)}
          </div>
        )}
      </div>

    </div>
  );
}

/* ── Shared styles ── */
const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};
