import { useState, useMemo, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import './App.css';

import { AppProvider, useApp } from './context/AppContext';
import PhoneFrame              from './components/PhoneFrame';
import ScreenTransition        from './components/ScreenTransition';

import SplashScreen                  from './screens/SplashScreen';
import AuthScreen                    from './screens/AuthScreen';
import SignUpScreen                  from './screens/SignUpScreen';
import WelcomeScreen                 from './screens/WelcomeScreen';
import OnboardingIntroScreen         from './screens/OnboardingIntroScreen';
import OnboardingNotificationsScreen from './screens/OnboardingNotificationsScreen';
import LoadingScreen                 from './screens/LoadingScreen';
import WalkthroughScreen1            from './screens/WalkthroughScreen1';
import WalkthroughScreen2            from './screens/WalkthroughScreen2';
import WalkthroughScreen3            from './screens/WalkthroughScreen3';
import WalkthroughScreen4            from './screens/WalkthroughScreen4';
import WalkthroughScreen5            from './screens/WalkthroughScreen5';
import HomeScreen                    from './screens/HomeScreen';
import AddEventScreen1               from './screens/AddEventScreen1';
import AddEventScreen2               from './screens/AddEventScreen2';
import AddEventScreen3               from './screens/AddEventScreen3';
import AddEventScreen4               from './screens/AddEventScreen4';
import AddEventScreen5               from './screens/AddEventScreen5';
import EventSavedScreen              from './screens/EventSavedScreen';
import EventDetailScreen             from './screens/EventDetailScreen';
import QuitConfirmModal              from './components/QuitConfirmModal';
import InsightsFlow, { SummaryOverlay } from './screens/InsightsFlow';
import ProfileScreen                 from './screens/ProfileScreen';
import ReportsScreen                 from './screens/ReportsScreen';
import NotificationsScreen           from './screens/NotificationsScreen';
import SettingsScreen                from './screens/SettingsScreen';

function AppContent() {
  const { isLoggedIn, onboardingDone, completeOnboarding, addEvent, setGender, login } = useApp();

  const [splashUp,   setSplashUp]   = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [authView,   setAuthView]   = useState('login');
  const [step,       setStep]       = useState('intro');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [activeTab,  setActiveTab]  = useState('home');
  const [addEventStep,  setAddEventStep]  = useState(null);
  const [pendingEvent,  setPendingEvent]  = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventId,    setNewEventId]    = useState(null);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [summaryData,   setSummaryData]   = useState(null);

  /* ── Slide direction + type ── */
  const [direction,      setDirection]      = useState('forward');
  const [transitionType, setTransitionType] = useState('slide');

  /* ── Unique key for the current screen — drives transition ── */
  const screenKey = useMemo(() => {
    if (!isLoggedIn && !welcomeDone) return 'welcome';
    if (!isLoggedIn) return authView;
    if (!onboardingDone) return step;
    if (activeTab !== 'home') return activeTab;
    if (selectedEvent) return 'event-detail';
    if (addEventStep)  return `add-${addEventStep}`;
    return 'home';
  }, [isLoggedIn, welcomeDone, authView, onboardingDone, step, activeTab, selectedEvent, addEventStep]);

  function quitAddEvent() {
    setShowQuitModal(false);
    setTransitionType('slide');
    setDirection('back');
    setAddEventStep(null);
    setPendingEvent({});
  }

  function dismissSplash() {
    if (splashUp) return;
    setSplashUp(true);
    setTimeout(() => setSplashGone(true), 520);
  }

  function renderContent() {
    /* ── Pre-login welcome ── */
    if (!isLoggedIn && !welcomeDone) {
      return (
        <WelcomeScreen onNext={() => { setDirection('forward'); login(); }} visible={splashGone} />
      );
    }

    /* ── Auth ── */
    if (!isLoggedIn) {
      if (authView === 'signup') {
        return (
          <SignUpScreen
            onGoToLogin={() => { setDirection('back'); setAuthView('login'); }}
          />
        );
      }
      return (
        <AuthScreen
          onGoToSignUp={() => { setDirection('forward'); setAuthView('signup'); }}
        />
      );
    }

    /* ── Main app (onboarding done) ── */
    if (onboardingDone) {
      if (activeTab === 'home') {
        if (selectedEvent) {
          return (
            <EventDetailScreen
              event={selectedEvent}
              onClose={() => { setDirection('back'); setSelectedEvent(null); }}
            />
          );
        }
        if (addEventStep === 'step1') {
          return (
            <AddEventScreen1
              onClose={() => setShowQuitModal(true)}
              onNext={({ timeOfDay }) => {
                setPendingEvent(prev => ({ ...prev, timeOfDay }));
                setTransitionType('fade');
                setDirection('forward');
                setAddEventStep('step2');
              }}
            />
          );
        }
        if (addEventStep === 'step2') {
          return (
            <AddEventScreen2
              onClose={() => setShowQuitModal(true)}
              onBack={() => { setTransitionType('fade'); setDirection('back'); setAddEventStep('step1'); }}
              timeOfDay={pendingEvent.timeOfDay}
              onNext={({ rating }) => {
                setPendingEvent(prev => ({ ...prev, rating }));
                setTransitionType('fade');
                setDirection('forward');
                setAddEventStep('step3');
              }}
            />
          );
        }
        if (addEventStep === 'step3') {
          return (
            <AddEventScreen3
              timeOfDay={pendingEvent.timeOfDay}
              rating={pendingEvent.rating}
              onClose={() => setShowQuitModal(true)}
              onBack={() => { setTransitionType('fade'); setDirection('back'); setAddEventStep('step2'); }}
              onNext={({ location, color }) => {
                setPendingEvent(prev => ({ ...prev, location, color }));
                setTransitionType('fade');
                setDirection('forward');
                setAddEventStep('step4');
              }}
            />
          );
        }
        if (addEventStep === 'step4') {
          return (
            <AddEventScreen4
              onClose={() => setShowQuitModal(true)}
              onBack={() => { setTransitionType('fade'); setDirection('back'); setAddEventStep('step3'); }}
              onNext={({ text }) => {
                setPendingEvent(prev => ({ ...prev, text }));
                setTransitionType('fade');
                setDirection('forward');
                setAddEventStep('step5');
              }}
            />
          );
        }
        if (addEventStep === 'step5') {
          return (
            <AddEventScreen5
              onClose={() => setShowQuitModal(true)}
              onBack={() => { setTransitionType('fade'); setDirection('back'); setAddEventStep('step4'); }}
              onSave={({ types }) => {
                setPendingEvent(prev => ({ ...prev, types }));
                setTransitionType('fade');
                setDirection('forward');
                setAddEventStep('saving');
              }}
            />
          );
        }
        if (addEventStep === 'saving') {
          return (
            <EventSavedScreen
              event={pendingEvent}
              onDone={() => {
                const id = `evt_${Date.now()}`;
                addEvent({ ...pendingEvent, id });
                setNewEventId(id);
                setPendingEvent({});
                setTransitionType('slide');
                setDirection('forward');
                setAddEventStep(null);
              }}
            />
          );
        }
        return (
          <HomeScreen
            onNavigate={(tab) => {
              setDirection(tab === 'home' ? 'back' : 'forward');
              setActiveTab(tab);
            }}
            onAddEvent={() => { setTransitionType('fade'); setDirection('forward'); setAddEventStep('step1'); }}
            onEventPress={evt => { setDirection('forward'); setSelectedEvent(evt); }}
            newEventId={newEventId}
            onNewEventAnimated={() => setNewEventId(null)}
            playEntrySound
          />
        );
      }
      if (activeTab === 'insights') {
        return (
          <InsightsFlow
            onClose={() => { setSummaryData(null); setDirection('back'); setActiveTab('home'); }}
            onShowSummary={data => setSummaryData(data)}
          />
        );
      }
      if (activeTab === 'profile') {
        return (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ProfileScreen onBack={() => { setDirection('back'); setActiveTab('home'); }} />
          </div>
        );
      }
      if (activeTab === 'reports') {
        return (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ReportsScreen onBack={() => { setDirection('back'); setActiveTab('home'); }} />
          </div>
        );
      }
      if (activeTab === 'notifications') {
        return (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <NotificationsScreen onBack={() => { setDirection('back'); setActiveTab('home'); }} />
          </div>
        );
      }
      if (activeTab === 'settings') {
        return (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <SettingsScreen onBack={() => { setDirection('back'); setActiveTab('home'); }} />
          </div>
        );
      }
      return null;
    }

    /* ── Onboarding ── */
    switch (step) {
      case 'intro':
        return (
          <OnboardingIntroScreen
            onDone={() => { setDirection('forward'); setStep('loading1'); }}
            onSkip={() => { setDirection('forward'); setStep('loading1'); }}
          />
        );
      case 'loading1':
        return (
          <LoadingScreen onDone={() => {
            flushSync(() => setTransitionType('fade'));
            setDirection('forward');
            setStep('walkthrough1');
          }} />
        );
      case 'walkthrough1':
        return (
          <WalkthroughScreen1 onDone={() => { setDirection('forward'); setStep('walkthrough2'); }} />
        );
      case 'walkthrough2':
        return (
          <WalkthroughScreen2
            onNext={() => { setDirection('forward'); setStep('walkthrough3'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
          />
        );
      case 'walkthrough3':
        return (
          <WalkthroughScreen3
            onNext={() => { setDirection('forward'); setStep('walkthrough4'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
          />
        );
      case 'walkthrough4':
        return (
          <WalkthroughScreen4
            onNext={() => { setDirection('forward'); setStep('walkthrough5'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
          />
        );
      case 'walkthrough5':
        return (
          <WalkthroughScreen5
            onDone={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
          />
        );
      case 'notifications':
        return (
          <OnboardingNotificationsScreen
            onNext={(id) => { setGender(id); setDirection('forward'); setStep('loading2'); }}
            onBack={() => { setDirection('back');    setStep('intro'); }}
          />
        );
      case 'loading2':
        return (
          <LoadingScreen
            text="כבר מתחילים.."
            onDone={() => { setDirection('forward'); completeOnboarding(); }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <PhoneFrame>
      {/* ── Main content wrapped in slide transition ── */}
      <ScreenTransition screenKey={screenKey} direction={direction} type={transitionType}>
        {renderContent()}
      </ScreenTransition>

      {/* ── Quit-confirmation modal — floats above everything ── */}
      {showQuitModal && (
        <QuitConfirmModal
          onBack={() => setShowQuitModal(false)}
          onQuit={quitAddEvent}
        />
      )}

      {/* ── Summary overlay — floats above scroll content, relative to phone-content ── */}
      {summaryData && (
        <SummaryOverlay
          viewMode={summaryData.viewMode}
          month={summaryData.month}
          year={summaryData.year}
          onClose={() => setSummaryData(null)}
        />
      )}

      {/* ── Splash overlay — slides up on swipe ── */}
      {!splashGone && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          transform: splashUp ? 'translateY(-100%)' : 'translateY(0)',
          transition: splashUp
            ? 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)'
            : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <SplashScreen onSwipeUp={dismissSplash} />
        </div>
      )}
    </PhoneFrame>
  );
}

/* ── Fullscreen video splash — sits outside the phone frame ── */
const VIDEO_SRC = '/Screen saver recording.mp4';

function VideoSplash({ onStart }) {
  const [fading, setFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  function handleStart() {
    setFading(true);
    setTimeout(onStart, 600);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-end',
      background: '#000',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      {VIDEO_SRC ? (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          loop muted playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        />
      ) : (
        /* Placeholder until video is ready */
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'Atlas', fontSize: 16, color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}>
            הוידאו יופיע כאן
          </p>
        </div>
      )}

      {/* התחל button */}
      <button
        onClick={handleStart}
        style={{
          position: 'relative', zIndex: 1,
          marginBottom: 60,
          padding: '16px 64px', borderRadius: 30,
          background: 'rgba(248,245,238,0.92)',
          border: 'none', cursor: 'pointer',
          fontFamily: 'Atlas', fontWeight: 700, fontSize: 20,
          color: '#45423A',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        התחל
      </button>
    </div>
  );
}

const INACTIVITY_MS = 3 * 60 * 1000; // 3 minutes

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [resetting,  setResetting]  = useState(false);
  const timerRef = useRef(null);

  /* Start inactivity watch once the user dismisses the splash */
  useEffect(() => {
    if (showSplash) return;

    function doReset() {
      setResetting(true);
      setTimeout(() => {
        Object.keys(localStorage)
          .filter(k => k.startsWith('onuma_'))
          .forEach(k => localStorage.removeItem(k));
        window.location.reload();
      }, 800);
    }

    function kick() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(doReset, INACTIVITY_MS);
    }

    const EVENTS = ['mousedown', 'mousemove', 'touchstart', 'touchmove', 'keydown', 'scroll'];
    EVENTS.forEach(e => window.addEventListener(e, kick, { passive: true }));
    kick(); // arm the timer immediately

    return () => {
      clearTimeout(timerRef.current);
      EVENTS.forEach(e => window.removeEventListener(e, kick));
    };
  }, [showSplash]);

  return (
    <AppProvider>
      <AppContent />
      {showSplash && <VideoSplash onStart={() => setShowSplash(false)} />}

      {/* Fade-to-black curtain on inactivity reset */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: '#000',
        opacity: resetting ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }} />
    </AppProvider>
  );
}
