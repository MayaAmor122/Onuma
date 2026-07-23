import { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_SPACES = [
  { id: 'home',           name: 'Home',           color: '#7a7a7a', enabled: false, isCustom: false },
  { id: 'work',           name: 'Work',           color: '#3d3d3d', enabled: false, isCustom: false },
  { id: 'school',         name: 'School',         color: '#b0b0b0', enabled: false, isCustom: false },
  { id: 'love',           name: 'Love',           color: '#1a1a1a', enabled: false, isCustom: false },
  { id: 'health',         name: 'Health',         color: '#969696', enabled: false, isCustom: false },
  { id: 'transportation', name: 'Transportation', color: '#5a5a5a', enabled: false, isCustom: false },
];

export const GRAY_SWATCHES = [
  '#f0f0f0', '#d8d8d8', '#c0c0c0', '#a8a8a8',
  '#909090', '#787878', '#606060', '#484848',
  '#383838', '#282828', '#181818', '#000000',
  '#e8e8e8', '#c4c4c4', '#888888', '#444444',
];

const AppContext = createContext(null);

/* 10 pre-seeded events shown from the very first session so the board
   never looks empty during the exhibition. Generated relative to today
   so they always appear recent. */
function makeDemoEvents() {
  const now = new Date();
  function daysAgo(n, hour) {
    const d = new Date(now);
    d.setDate(d.getDate() - n);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  }
  return [
    { id: 'demo-1',  color: '#183497', rating: 4, timeOfDay: 'morning',   location: 'עבודה', types: ['בדיקה', 'ספירה'],             text: '',        timestamp: daysAgo(13, 8)  },
    { id: 'demo-2',  color: '#FFC8CE', rating: 2, timeOfDay: 'evening',   location: 'בית',   types: ['מחשבה טורדנית'],               text: '',        timestamp: daysAgo(12, 19) },
    { id: 'demo-3',  color: '#00BE4A', rating: 3, timeOfDay: 'afternoon', location: null,    types: ['הימנעות'],                     text: '',        timestamp: daysAgo(11, 16) },
    { id: 'demo-4',  color: '#FFDB60', rating: 5, timeOfDay: 'noon',      location: 'עבודה', types: ['ניקיון', 'סידור'],             text: '',        timestamp: daysAgo(10, 13) },
    { id: 'demo-5',  color: '#B6CDFF', rating: 2, timeOfDay: 'night',     location: 'בית',   types: ['חזרתיות'],                     text: '',        timestamp: daysAgo(9,  23) },
    { id: 'demo-6',  color: '#183497', rating: 3, timeOfDay: 'morning',   location: null,    types: ['בדיקה'],                       text: '',        timestamp: daysAgo(7,  8)  },
    { id: 'demo-7',  color: '#FFC8CE', rating: 4, timeOfDay: 'afternoon', location: 'בית',   types: ['הסתרה', 'הימנעות'],            text: '',        timestamp: daysAgo(6,  16) },
    { id: 'demo-8',  color: '#FFDB60', rating: 1, timeOfDay: 'evening',   location: 'עבודה', types: ['ארגון'],                       text: '',        timestamp: daysAgo(4,  19) },
    { id: 'demo-9',  color: '#00BE4A', rating: 3, timeOfDay: 'noon',      location: null,    types: ['צורך בוודאות', 'אישור'],       text: '',        timestamp: daysAgo(2,  13) },
    { id: 'demo-10', color: '#B6CDFF', rating: 4, timeOfDay: 'morning',   location: 'בית',   types: ['מחשבה טורדנית', 'ספירה'],     text: '',        timestamp: daysAgo(1,  8)  },
  ];
}

/* Maps each time-of-day choice to a representative hour so mandalas match */
const TIME_OF_DAY_HOURS = { morning: 8, noon: 13, afternoon: 16, evening: 19, night: 23 };

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [spaces, setSpaces] = useState(() => load('onuma_spaces', DEFAULT_SPACES));
  const [events, setEvents] = useState(() => load('onuma_events', makeDemoEvents()));
  const [onboardingDone, setOnboardingDone] = useState(
    () => localStorage.getItem('onuma_onboarded') === 'true'
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('onuma_logged_in') === 'true'
  );
  const [userName,              setUserName]              = useState(() => localStorage.getItem('onuma_userName')  || 'Maya Amor');
  const [userEmail,             setUserEmail]             = useState(() => localStorage.getItem('onuma_userEmail') || 'Maya4085@gmail.com');
  const [notificationsEnabled,  setNotificationsEnabled]  = useState(() => localStorage.getItem('onuma_notifications') !== 'false');
  const [theme,                 setTheme]                 = useState(() => localStorage.getItem('onuma_theme') || 'light');
  const [gender,                setGender]                = useState(() => localStorage.getItem('onuma_gender') || 'male');

  useEffect(() => { localStorage.setItem('onuma_userName',      userName);                        }, [userName]);
  useEffect(() => { localStorage.setItem('onuma_userEmail',     userEmail);                       }, [userEmail]);
  useEffect(() => { localStorage.setItem('onuma_notifications', String(notificationsEnabled));    }, [notificationsEnabled]);
  useEffect(() => { localStorage.setItem('onuma_theme',         theme);                           }, [theme]);
  useEffect(() => { localStorage.setItem('onuma_gender',        gender);                          }, [gender]);

  useEffect(() => { localStorage.setItem('onuma_spaces', JSON.stringify(spaces)); }, [spaces]);
  useEffect(() => { localStorage.setItem('onuma_events', JSON.stringify(events)); }, [events]);

  function addEvent({ id, text = '', location = null, color, types = [], rating = 1, timeOfDay } = {}) {
    const d = new Date();
    if (timeOfDay) d.setHours(TIME_OF_DAY_HOURS[timeOfDay] ?? 8, 0, 0, 0);
    const evt = {
      id:        id || `evt_${Date.now()}`,
      text,
      location,
      color:     color || '#1a1a1a',
      types,
      rating,
      timeOfDay,
      timestamp: d.toISOString(),
    };
    setEvents(prev => [...prev, evt]);
  }

  function updateSpace(id, patch) {
    setSpaces(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  }

  function addCustomSpace(name) {
    const id = `custom_${Date.now()}`;
    setSpaces(prev => [
      ...prev,
      { id, name, color: '#888888', enabled: true, isCustom: true },
    ]);
    return id;
  }

  function completeOnboarding() {
    setOnboardingDone(true);
    localStorage.setItem('onuma_onboarded', 'true');
  }

  function updateProfile({ name, email } = {}) {
    if (name  !== undefined) setUserName(name);
    if (email !== undefined) setUserEmail(email);
  }

  function login(email = '') {
    setIsLoggedIn(true);
    localStorage.setItem('onuma_logged_in', 'true');
    if (email) setUserEmail(email);
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem('onuma_logged_in');
  }

  // Convenience: only spaces the user enabled
  const activeSpaces = spaces.filter(s => s.enabled);

  return (
    <AppContext.Provider value={{
      spaces, activeSpaces, events,
      onboardingDone, isLoggedIn,
      userName, userEmail, notificationsEnabled, theme, gender,
      addEvent, updateSpace, addCustomSpace, completeOnboarding,
      login, logout, updateProfile, setNotificationsEnabled, setTheme, setGender,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
