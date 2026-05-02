import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const ADMIN_SESSION_KEY = 'deepindiary_admin_pw';

export default function AdminPage({ apiUrl, onPostAdded }) {
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  // On mount, verify saved session password is still valid
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!saved) { setChecking(false); return; }
    fetch(`${apiUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: saved }),
    }).then(r => {
      if (r.ok) { setAdminPassword(saved); setIsLoggedIn(true); }
      else { sessionStorage.removeItem(ADMIN_SESSION_KEY); }
    }).catch(() => {}).finally(() => setChecking(false));
  }, [apiUrl]);

  const handleLogin = (pw) => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, pw);
    setAdminPassword(pw);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminPassword('');
    setIsLoggedIn(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--paper)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Checking session…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin apiUrl={apiUrl} onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Admin topbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--amber, #d97706), #7a4e18)' }}>
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-white font-bold text-sm hidden sm:block">DeepInDiary</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/"
            className="text-xs font-semibold px-4 py-2 rounded-full transition hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            ← View Site
          </a>
          <button onClick={handleLogout}
            className="text-xs font-semibold px-4 py-2 rounded-full transition hover:opacity-80"
            style={{ background: '#dc2626', color: 'white' }}>
            Logout
          </button>
        </div>
      </div>

      <main className="pb-24">
        <AdminPanel apiUrl={apiUrl} onPostAdded={onPostAdded} adminPassword={adminPassword} />
      </main>
    </div>
  );
}
