import DotFadeDecoration from '../components/DotFadeDecoration';

/* ── Icons ── */
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#45423A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

/* ── Static placeholder data — this screen doesn't do anything yet ── */
const GROUPS = [
  {
    date: '16 באפריל',
    items: [
      { time: '10:45', text: 'בוקר טוב - איך מתחיל היום? קח רגע לתעד...' },
      { time: '10:23', text: 'עברו 3 שעות מהתיעוד האחרון שלך, האם קרה משהו מאז?' },
      { time: '07:23', text: 'זה הזמן לתעד - אירועים שתועדו קצת לאחר המקרה, לרוב מדויקים יותר' },
      { time: '20:12', text: 'עברו 5 שעות מהתיעוד האחרון שלך, האם יש אירוע שתרצה לתעד?' },
    ],
  },
  {
    date: '12 באפריל',
    items: [
      { time: '15:10', text: 'עברו יומיים מהתיעוד האחרון שלך' },
      { time: '09:30', text: 'בוקר טוב - כל תיעוד מוקדם מסייע לדיוק התמונה הכוללת', read: true },
    ],
  },
  {
    date: '10 באפריל',
    items: [
      { time: '18:39', text: 'איך עבר עלייך אחר הצהריים?' },
      { time: '17:18', text: 'חודש חדש מתחיל - כל תיעוד מקרב אותך לתמונה הגדולה', read: true },
    ],
  },
  {
    date: '7 באפריל',
    items: [
      { time: '21:05', text: 'ערב טוב - לפני שאתה הולך לישון, יש אירוע שכדאי לתעד?', read: true },
      { time: '14:50', text: 'עברו 4 שעות מהתיעוד האחרון שלך, האם קרה משהו נוסף?', read: true },
      { time: '08:15', text: 'זה הזמן לתעד - תיעוד בבוקר עוזר לזהות דפוסים לאורך היום', read: true },
    ],
  },
  {
    date: '4 באפריל',
    items: [
      { time: '19:22', text: 'שבוע חדש מתחיל - כדאי לתעד כדי לעקוב אחרי השינויים', read: true },
      { time: '11:40', text: 'עברו יומיים מהתיעוד האחרון שלך', read: true },
    ],
  },
  {
    date: '1 באפריל',
    items: [
      { time: '20:00', text: 'חודש חדש מתחיל - כל תיעוד מקרב אותך לתמונה הגדולה', read: true },
      { time: '16:30', text: 'איך עבר עלייך אחר הצהריים? קח רגע לתעד', read: true },
      { time: '09:10', text: 'בוקר טוב - תיעוד מוקדם מסייע לדיוק התמונה הכוללת שלך', read: true },
    ],
  },
];

/* ── Notification card ── */
function NotificationCard({ time, text, read }) {
  const color = read ? '#87837A' : '#323232';
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', direction: 'rtl',
      justifyContent: 'space-between', alignItems: 'center', gap: 10,
      border: '1.5px solid #E2DFD0', borderRadius: 16,
      padding: '14px 16px', marginBottom: 10, boxSizing: 'border-box',
      background: 'rgba(248,245,238,0.63)',
    }}>
      <p style={{ flex: 1, fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color, lineHeight: 1.4, margin: 0, textAlign: 'right' }}>
        {text}
      </p>
      <span style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 13, color: '#87837A', flexShrink: 0 }}>
        {time}
      </span>
    </div>
  );
}

/* ════════════════════════════════
   Screen — placeholder only, static content
════════════════════════════════ */
export default function NotificationsScreen({ onBack }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Top bar: back chevron ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 0', position: 'relative', zIndex: 1 }}>
        <button onClick={onBack} style={iconBtn}><ChevronRightIcon /></button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="no-scrollbar" style={{
        flex: 1, overflowY: 'auto', padding: '20px 24px 0', position: 'relative', zIndex: 1,
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
      }}>

        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 24, color: '#45423A',
          textAlign: 'right', direction: 'rtl', margin: '0 0 20px',
        }}>
          התראות
        </p>

        {GROUPS.map((group, i) => (
          <div key={group.date}>
            {i > 0 && <div style={{ height: 1, background: '#D4D1C3', margin: '18px 0' }} />}
            <p style={{
              fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#87837A',
              textAlign: 'right', direction: 'rtl', margin: '0 0 10px',
            }}>
              {group.date}
            </p>
            {group.items.map((item, j) => (
              <NotificationCard key={item.time} {...item} fadeBackground={i === 0 && j < 2} />
            ))}
          </div>
        ))}

      </div>

      {/* ── Decorative dots — flush against the top edge, fade touching the edge itself ── */}
      <DotFadeDecoration anchor="top" flip />

    </div>
  );
}

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
