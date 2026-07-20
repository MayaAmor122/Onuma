import { useState, useRef, useEffect } from 'react';
import decoration1 from '../assets/images/onboarding-decoration-1.png';
import decoration2 from '../assets/images/onboarding-decoration-2.png';
import decoration3 from '../assets/images/onboarding-decoration-3.png';

/* Per-slide content. `reverse: true` = text near indicator, image near buttons (screen 2). */
const SLIDES = [
  {
    image:     decoration1,
    title:     'כל אירוע שתועד הוא\nחלק מהתמונה הגדולה',
    paragraph: 'כל תיעוד מוסיף עוד מידע. גם אירועים\nשנראים קטנים או חוזרים על עצמם\nעוזרים למערכת להבין טוב יותר',
    reverse:   false,
  },
  {
    image:     decoration2,
    title:     'לאורך הזמן מתחילה\nלהיווצר תמונה רחבה',
    paragraph: 'ככל שתוסיף אירועים, המערכת תזהה\nקשרים, חזרות ודפוסים שקשה לראות\nבאירוע בודד.',
    reverse:   true,
  },
  {
    image:     decoration3,
    title:     'התובנות יעזרו לך\nלהבין דפוסים חוזרים',
    paragraph: 'התובנות יעזרו לך לזהות אילו מצבים,\nמקומות או זמנים חוזרים שוב ושוב',
    reverse:   false,
  },
];

/* ── Shared blocks ── */
function TextBlock({ title, paragraph, style, delay = 0 }) {
  // Lock in the delay at mount time — parent re-renders between mount and
  // screen-visible don't overwrite it (SlideTransition causes one such re-render).
  const d = useRef(delay).current;
  return (
    <div style={{ padding: '0 28px', textAlign: 'right', ...style }}>
      <p style={{
        fontFamily: 'Atlas', fontWeight: 500, fontSize: 24,
        color: '#45423A', lineHeight: '26px',
        whiteSpace: 'pre-line', marginBottom: 14,
        animation: `textFadeIn 0.45s ease ${d}ms both`,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: 'Atlas', fontWeight: 400, fontSize: 16,
        color: '#323232', lineHeight: '22px', whiteSpace: 'pre-line',
        animation: `textFadeIn 0.45s ease ${d + 1000}ms both`,
      }}>
        {paragraph}
      </p>
    </div>
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

function ImageBlock({ image, style }) {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 28px', ...style,
    }}>
      <img src={image} alt="" style={{ width: '100%', maxWidth: 320, height: 'auto' }} />
    </div>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function OnboardingIntroScreen({ onDone, onSkip }) {
  const [slide, setSlide] = useState(0);
  const [pressed, setPressed] = useState(null);
  const { image, title, paragraph, reverse } = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  const isFirstRender = useRef(true);
  const textDelay = isFirstRender.current ? 300 : 0;
  useEffect(() => { isFirstRender.current = false; }, []);

  function handleNext() {
    if (!isLast) setSlide(s => s + 1);
    else onDone();
  }

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', direction: 'rtl', overflow: 'hidden',
    }}>

      {/* ── Slide indicator (left) + back chevron (right) ── */}
      <div style={{
        display: 'flex', flexDirection: 'row', direction: 'ltr',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '40px 28px 0', position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', direction: 'ltr', gap: 6 }}>
          {[...SLIDES].reverse().map((_, displayIdx) => {
            const i = SLIDES.length - 1 - displayIdx; // last slide renders leftmost
            return (
              <div key={i} style={{
                height: 8, width: i === slide ? 24 : 8, borderRadius: 4,
                background: i === slide ? '#323232' : 'rgba(50,50,50,0.25)',
                transition: 'width 0.25s ease',
              }} />
            );
          })}
        </div>

        {slide > 0 ? (
          <button
            onClick={() => setSlide(s => s - 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
          >
            <ChevronRightIcon />
          </button>
        ) : <div style={{ width: 20, height: 20 }} />}
      </div>

      {/* ── Image + text — order swaps for "reverse" slides ── */}
      {reverse ? (
        <>
          <TextBlock key={slide} title={title} paragraph={paragraph} delay={textDelay} style={{ paddingTop: 28 }} />
          <ImageBlock image={image} style={{ marginTop: 80 }} />
        </>
      ) : (
        <>
          <ImageBlock image={image} style={{ marginTop: -72 }} />
          <TextBlock key={slide} title={title} paragraph={paragraph} delay={textDelay} style={{ paddingBottom: 13 }} />
        </>
      )}

      {/* ── Bottom buttons ── */}
      <div style={{ padding: '16px 28px 44px' }}>
        {isLast ? (
          <button onClick={handleNext} {...press('next')} style={{
            ...nextBtn, width: '100%', padding: '16px 0',
            background: pressed === 'next' ? '#2E2B25' : '#45423A',
            transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.12s ease, background 0.12s ease',
          }}>
            כניסה לאירועים שלי
          </button>
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'row', direction: 'rtl',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span onClick={onSkip} {...press('skip')} style={{
              ...skipStyle,
              opacity: pressed === 'skip' ? 0.5 : 1,
              transition: 'opacity 0.12s ease',
            }}>דלג</span>
            <button onClick={handleNext} {...press('next')} style={{
              ...nextBtn,
              background: pressed === 'next' ? '#2E2B25' : '#45423A',
              transform: pressed === 'next' ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.12s ease, background 0.12s ease',
            }}>המשך</button>
          </div>
        )}
      </div>

    </div>
  );
}

const nextBtn = {
  padding: '14px 40px', borderRadius: 30,
  background: '#45423A', border: 'none', color: '#F8F5EE',
  fontSize: 18, fontWeight: 700, fontFamily: 'Atlas', cursor: 'pointer',
};

const skipStyle = {
  fontFamily: 'Atlas', fontWeight: 400, fontSize: 16,
  color: '#323232', cursor: 'pointer',
};
