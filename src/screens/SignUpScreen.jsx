import { useState } from 'react';
import { useApp } from '../context/AppContext';
import DotFadeDecoration from '../components/DotFadeDecoration';

/* ── Google icon — all blue ── */
function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="#45423A" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-7.09z"/>
      <path fill="#45423A" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#45423A" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#45423A" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ── Apple icon ── */
function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#45423A">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

/* ── Eye icons — blue ── */
function EyeOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#183497" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="#183497" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ════════════════════════════════
   Screen
════════════════════════════════ */
export default function SignUpScreen({ onGoToLogin }) {
  const { login } = useApp();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [pressed,  setPressed]  = useState(null);

  const press = id => ({
    onPointerDown: () => setPressed(id),
    onPointerUp:   () => setPressed(null),
    onPointerLeave:() => setPressed(null),
  });

  const canSubmit = email.trim().length > 0 && password.length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    login(email);
  }

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#F8F5EE', direction: 'rtl',
      overflow: 'hidden', position: 'relative',
    }}>

      {/* ── Main content ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '60px 28px 0', position: 'relative', zIndex: 1,
      }}>

        {/* Title */}
        <p style={{
          fontFamily: 'Atlas', fontWeight: 500, fontSize: 24,
          color: '#45423A', textAlign: 'right', marginBottom: 36,
        }}>
          יצירת חשבון
        </p>

        {/* Email label */}
        <label style={{
          display: 'block', fontFamily: 'Atlas', fontWeight: 400,
          fontSize: 14, color: '#183497', textAlign: 'right', marginBottom: 8,
        }}>
          אימייל
        </label>

        {/* Email input */}
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Name@gmail.com"
          style={{
            width: '100%', padding: '14px 18px', borderRadius: 30,
            border: 'none', background: '#EBE8DB',
            fontSize: 15, color: '#323232', fontFamily: 'Atlas',
            outline: 'none', boxSizing: 'border-box', marginBottom: 20,
            direction: 'ltr', textAlign: 'left',
          }}
        />

        {/* Password label */}
        <label style={{
          display: 'block', fontFamily: 'Atlas', fontWeight: 400,
          fontSize: 14, color: '#183497', textAlign: 'right', marginBottom: 8,
        }}>
          סיסמא
        </label>

        {/* Password input + eye toggle */}
        <div style={{ position: 'relative', marginBottom: 20, direction: 'ltr' }}>
          <input
            className="auth-input"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••••"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%', padding: '14px 48px 14px 18px', borderRadius: 30,
              border: 'none', background: '#EBE8DB',
              fontSize: 15, color: '#323232', fontFamily: 'Atlas',
              outline: 'none', boxSizing: 'border-box', direction: 'ltr',
            }}
          />
          <button
            onClick={() => setShowPass(v => !v)}
            style={{
              position: 'absolute', right: 16, top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, display: 'flex', alignItems: 'center',
            }}
          >
            {showPass ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          {...press('submit')}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 30,
            background: pressed === 'submit' ? '#2E2B25' : '#45423A', border: 'none', color: '#F8F5EE',
            fontSize: 18, fontWeight: 700, fontFamily: 'Atlas', cursor: 'pointer',
            transform: pressed === 'submit' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.12s ease, background 0.12s ease',
          }}
        >
          המשך
        </button>

        {/* "Or connect another way" */}
        <p style={{
          fontFamily: 'Atlas', fontWeight: 400, fontSize: 16,
          color: '#323232', textAlign: 'right', marginBottom: 14, marginTop: 52,
        }}>
          או התחבר בעזרת
        </p>

        {/* Social buttons */}
        <div style={{ display: 'flex', gap: 12, direction: 'ltr', marginBottom: 28 }}>
          <button onClick={() => login()} {...press('apple')} style={{
            ...socialBtn,
            background: pressed === 'apple' ? 'rgba(69,66,58,0.10)' : 'transparent',
            borderColor: pressed === 'apple' ? '#2E2B25' : '#45423A',
            transform: pressed === 'apple' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.12s ease, background 0.12s ease, border-color 0.12s ease',
          }}>
            <AppleIcon />
          </button>
          <button onClick={() => login()} {...press('google')} style={{
            ...socialBtn,
            background: pressed === 'google' ? 'rgba(69,66,58,0.10)' : 'transparent',
            borderColor: pressed === 'google' ? '#2E2B25' : '#45423A',
            transform: pressed === 'google' ? 'scale(0.97)' : 'scale(1)',
            transition: 'transform 0.12s ease, background 0.12s ease, border-color 0.12s ease',
          }}>
            <GoogleIcon />
          </button>
        </div>

        <div style={{ flex: 1 }} />

      </div>

      {/* ── Bottom link ── */}
      <div style={{
        padding: '0 28px 40px', textAlign: 'center',
        direction: 'rtl', position: 'relative', zIndex: 1,
      }}>
        <p style={{ fontFamily: 'Atlas', fontWeight: 400, fontSize: 14, color: '#323232' }}>
          כבר יש לך משתמש?{' '}
          <span
            onClick={onGoToLogin}
            {...press('link')}
            style={{ fontWeight: 700, cursor: 'pointer', opacity: pressed === 'link' ? 0.5 : 1, transition: 'opacity 0.12s ease' }}
          >
            הכנס לחשבון
          </span>
        </p>
      </div>

      {/* ── Decorative dots ── */}
      <DotFadeDecoration />

    </div>
  );
}

/* ── Shared styles ── */
const socialBtn = {
  flex: 1, padding: '15px 0', borderRadius: 30,
  border: '1.5px solid #45423A', background: 'transparent',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};
