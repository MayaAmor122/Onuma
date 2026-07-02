import { useState, useMemo } from 'react';
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
import InsightsFlow                  from './screens/InsightsFlow';
import ProfileScreen                 from './screens/ProfileScreen';
import ReportsScreen                 from './screens/ReportsScreen';
import NotificationsScreen           from './screens/NotificationsScreen';
import SettingsScreen                from './screens/SettingsScreen';

function AppContent() {
  const { isLoggedIn, onboardingDone, completeOnboarding, addEvent } = useApp();

  const [splashUp,   setSplashUp]   = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const [authView,   setAuthView]   = useState('login');
  const [step,       setStep]       = useState('welcome');
  const [activeTab,  setActiveTab]  = useState('home');
  const [addEventStep,  setAddEventStep]  = useState(null);
  const [pendingEvent,  setPendingEvent]  = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventId,    setNewEventId]    = useState(null);
  const [showQuitModal, setShowQuitModal] = useState(false);

  /* ── Slide direction + type ── */
  const [direction,      setDirection]      = useState('forward');
  const [transitionType, setTransitionType] = useState('slide');

  /* ── Unique key for the current screen — drives transition ── */
  const screenKey = useMemo(() => {
    if (!isLoggedIn) return authView;
    if (!onboardingDone) return step;
    if (activeTab !== 'home') return activeTab;
    if (selectedEvent) return 'event-detail';
    if (addEventStep)  return `add-${addEventStep}`;
    return 'home';
  }, [isLoggedIn, authView, onboardingDone, step, activeTab, selectedEvent, addEventStep]);

  function quitAddEvent() {
    setShowQuitModal(false);
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
              onBack={() => { setDirection('back'); setAddEventStep('step1'); }}
              timeOfDay={pendingEvent.timeOfDay}
              onNext={({ rating }) => {
                setPendingEvent(prev => ({ ...prev, rating }));
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
              onBack={() => { setDirection('back'); setAddEventStep('step2'); }}
              onNext={({ location, color }) => {
                setPendingEvent(prev => ({ ...prev, location, color }));
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
              onBack={() => { setDirection('back'); setAddEventStep('step3'); }}
              onNext={({ text }) => {
                setPendingEvent(prev => ({ ...prev, text }));
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
              onBack={() => { setDirection('back'); setAddEventStep('step4'); }}
              onSave={({ types }) => {
                setPendingEvent(prev => ({ ...prev, types }));
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
            onAddEvent={() => { setDirection('forward'); setAddEventStep('step1'); }}
            onEventPress={evt => { setDirection('forward'); setSelectedEvent(evt); }}
            newEventId={newEventId}
            onNewEventAnimated={() => setNewEventId(null)}
          />
        );
      }
      if (activeTab === 'insights') {
        return <InsightsFlow onClose={() => { setDirection('back'); setActiveTab('home'); }} />;
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
      case 'welcome':
        return (
          <WelcomeScreen
            onNext={() => { setDirection('forward'); setStep('intro'); }}
          />
        );
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
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('loading2'); }}
          />
        );
      case 'walkthrough3':
        return (
          <WalkthroughScreen3
            onNext={() => { setDirection('forward'); setStep('walkthrough4'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('loading2'); }}
          />
        );
      case 'walkthrough4':
        return (
          <WalkthroughScreen4
            onNext={() => { setDirection('forward'); setStep('walkthrough5'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('loading2'); }}
          />
        );
      case 'walkthrough5':
        return (
          <WalkthroughScreen5
            onDone={() => { setDirection('forward'); setTransitionType('slide'); setStep('notifications'); }}
            onSkip={() => { setDirection('forward'); setTransitionType('slide'); setStep('loading2'); }}
          />
        );
      case 'notifications':
        return (
          <OnboardingNotificationsScreen
            onNext={() => { setDirection('forward'); setStep('loading2'); }}
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

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
