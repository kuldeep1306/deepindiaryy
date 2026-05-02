import { useState } from 'react';


// ── Chai Cup Animation ──────────────────────────────────────
function ChaiCup({ size = 1, style = {} }) {
  return (
    <div style={{ transform: `scale(${size})`, transformOrigin: 'bottom center', ...style }}>
      <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Steam lines */}
        <g className="chai-steam">
          <path d="M16 10 Q14 5 16 0 Q18 5 16 10" stroke="rgba(200,137,58,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M16 10 Q14 5 16 0 Q18 5 16 10;M16 10 Q18 4 16 -1 Q14 4 16 10;M16 10 Q14 5 16 0 Q18 5 16 10" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.8;0" dur="2.2s" repeatCount="indefinite"/>
          </path>
          <path d="M24 12 Q22 6 24 0 Q26 6 24 12" stroke="rgba(200,137,58,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M24 12 Q22 6 24 0 Q26 6 24 12;M24 12 Q26 5 24 -2 Q22 5 24 12;M24 12 Q22 6 24 0 Q26 6 24 12" dur="2.8s" repeatCount="indefinite" begin="0.4s"/>
            <animate attributeName="opacity" values="0;0.6;0" dur="2.8s" repeatCount="indefinite" begin="0.4s"/>
          </path>
          <path d="M32 10 Q30 5 32 0 Q34 5 32 10" stroke="rgba(200,137,58,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M32 10 Q30 5 32 0 Q34 5 32 10;M32 10 Q34 4 32 -1 Q30 4 32 10;M32 10 Q30 5 32 0 Q34 5 32 10" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
            <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
          </path>
        </g>
        {/* Cup body */}
        <path d="M8 18 L10 46 Q10 48 12 48 L36 48 Q38 48 38 46 L40 18 Z" fill="rgba(200,137,58,0.15)" stroke="rgba(200,137,58,0.5)" strokeWidth="1.2"/>
        {/* Tea surface */}
        <ellipse cx="24" cy="21" rx="15.5" ry="3" fill="rgba(180,110,30,0.4)" stroke="rgba(200,137,58,0.4)" strokeWidth="0.8"/>
        {/* Chai color fill */}
        <path d="M8.6 21 L10 46 Q10 48 12 48 L36 48 Q38 48 38 46 L39.4 21 Z" fill="rgba(150,80,20,0.25)"/>
        {/* Handle */}
        <path d="M40 24 Q50 24 50 32 Q50 40 40 40" stroke="rgba(200,137,58,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Saucer */}
        <ellipse cx="24" cy="51" rx="20" ry="3.5" fill="rgba(200,137,58,0.12)" stroke="rgba(200,137,58,0.35)" strokeWidth="1"/>
        {/* Shimmer on tea */}
        <ellipse cx="20" cy="21" rx="5" ry="1" fill="rgba(255,220,150,0.3)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
        </ellipse>
      </svg>
    </div>
  );
}

export default function AdminLogin({ apiUrl, onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!password.trim()) { setError('Password required.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server se connect nahi ho pa raha. Backend chal raha hai?');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Wrong password');
      onLogin(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--paper)', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-14"
        style={{ background: 'linear-gradient(145deg, #0a0a0f 0%, #11100d 40%, #1a1610 100%)' }}>
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, var(--amber) 0%, transparent 65%)' }} />
          <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, var(--amber) 0%, transparent 65%)' }} />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)', boxShadow: '0 0 24px rgba(200,137,58,0.4)' }}>
              <span className="text-white text-xl font-black">D</span>
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight">DeepInDiary</p>
              <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(200,137,58,0.7)' }}>Admin Console</p>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase font-semibold mb-4" style={{ color: 'var(--amber)' }}>
              — Restricted Access
            </p>
            <h2 className="text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome<br />
              <span style={{ color: 'var(--amber)' }}>Back,</span><br />
              Admin.
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: 'rgba(240,236,227,0.45)', maxWidth: '380px' }}>
              Manage stories, approve submissions, and keep DeepInDiary running smoothly from your secure dashboard.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {['📬 Submissions', '✍️ Posts', '💬 Feedback', '📊 Analytics'].map(item => (
              <span key={item} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(200,137,58,0.12)', border: '1px solid rgba(200,137,58,0.2)', color: 'rgba(200,137,58,0.8)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 flex items-end justify-between">
          <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(240,236,227,0.3)', fontFamily: "'Playfair Display', serif", maxWidth: '300px' }}>
            "Every untold story deserves a voice. You're the guardian of those voices."
          </p>
          <ChaiCup size={0.9} style={{ opacity: 0.85, marginBottom: '-4px' }} />
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 relative">
        {/* Mobile logo */}
        <div className="absolute top-8 left-6 flex items-center gap-2 lg:hidden">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)' }}>
            <span className="text-white text-sm font-black">D</span>
          </div>
          <span className="font-black text-sm" style={{ color: 'var(--ink)' }}>DeepInDiary</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'var(--amber-dim)', border: '1px solid var(--amber-glow)', color: 'var(--amber)' }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--amber)' }} />
              Secure Admin Area
            </div>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--ink)', fontFamily: "'Playfair Display', serif" }}>
                Sign In
              </h1>
              <ChaiCup size={0.6} style={{ opacity: 0.55, marginTop: '-6px' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Enter your admin credentials to continue.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3.5"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <svg className="mt-0.5 flex-shrink-0 h-4 w-4" style={{ color: '#dc2626' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium" style={{ color: '#dc2626' }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl px-4 py-4 text-sm pr-12 outline-none transition-all"
                  style={{
                    background: 'var(--paper-warm)',
                    border: error ? '1.5px solid rgba(239,68,68,0.4)' : '1.5px solid var(--border)',
                    color: 'var(--ink)',
                    fontSize: showPw ? '14px' : '18px',
                    letterSpacing: showPw ? 'normal' : '0.15em',
                  }}
                  autoFocus
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--muted)' }}>
                  {showPw ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full rounded-2xl py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #1a1610, #2a2218)', border: '1px solid rgba(200,137,58,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(135deg, rgba(200,137,58,0.15), rgba(200,137,58,0.05))' }} />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    Access Dashboard
                  </>
                )}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-xs" style={{ color: 'var(--muted)' }}>
            Not an admin?{' '}
            <a href="/" className="font-semibold hover:underline" style={{ color: 'var(--amber)' }}>
              Return to site →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
