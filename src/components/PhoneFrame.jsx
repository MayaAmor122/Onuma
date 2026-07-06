import { useState, useEffect } from 'react';

const FRAME_W = 390;
const FRAME_H = 844;

export default function PhoneFrame({ children }) {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / FRAME_W, window.innerHeight / FRAME_H, 1)
  );

  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / FRAME_W, window.innerHeight / FRAME_H, 1));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ width: FRAME_W * scale, height: FRAME_H * scale, flexShrink: 0 }}>
    <div className="phone-shell" style={{
      width: FRAME_W,
      height: FRAME_H,
      background: '#F8F5EE',
      borderRadius: 52,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.12)',
      flexShrink: 0,
      transformOrigin: 'top left',
      transform: `scale(${scale})`,
    }}>
      {/* ── Status bar ── */}
      <div className="phone-status-bar" style={{
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', letterSpacing: '-0.2px' }}>
          9:41
        </span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect x="0"  y="7"  width="3" height="5"  rx="0.8" fill="#1a1a1a"/>
            <rect x="5"  y="4"  width="3" height="8"  rx="0.8" fill="#1a1a1a"/>
            <rect x="10" y="1"  width="3" height="11" rx="0.8" fill="#1a1a1a"/>
            <rect x="15" y="0"  width="3" height="12" rx="0.8" fill="#1a1a1a" opacity="0.25"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <circle cx="8" cy="11" r="1.4" fill="#1a1a1a"/>
            <path d="M4.2 7.5A5.3 5.3 0 0 1 8 6a5.3 5.3 0 0 1 3.8 1.5"
                  stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M1.5 4.5A8.6 8.6 0 0 1 8 2a8.6 8.6 0 0 1 6.5 2.5"
                  stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
            <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#1a1a1a" strokeOpacity="0.35"/>
            <rect x="23.5" y="4" width="2" height="5" rx="1" fill="#1a1a1a" fillOpacity="0.4"/>
            <rect x="2" y="2" width="18" height="9" rx="1.5" fill="#1a1a1a"/>
          </svg>
        </div>
      </div>

      {/* ── Screen content ── */}
      <div className="phone-content" style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
    </div>
  );
}
