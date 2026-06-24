import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Home',       anchor: '#home' },
  { label: 'Posts',      anchor: '#posts' },
  { label: 'Your Story', anchor: '#share-story' },
  { label: 'About',      anchor: '#about' },
];

export default function Header({ theme, toggleTheme, isMenuOpen, setIsMenuOpen, showAdminSection, setShowAdminSection, setShowFeedback }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'var(--glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">

        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)' }}
          >
            <span className="font-display text-white font-bold text-lg leading-none">D</span>
            <div className="absolute inset-0 rounded-xl ring-2 ring-white/10" />
          </div>
          <div className="hidden sm:block">
  <span
    className="font-display text-xl font-bold tracking-tight"
    style={{ color: 'var(--ink)' }}
  >
    Deep<span style={{ color: 'var(--amber)' }}>InDiary</span>
  </span>

  <p className="text-xs opacity-80">
    Managed by{" "}
    <a
      href="https://thekuldeepsays.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'var(--amber)' }}
    >
      Kuldeep Sharma
    </a>
  </p>
</div>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}
        >
          {NAV_ITEMS.map(({ label, anchor }) => (
            <a
              key={label}
              href={anchor}
              onClick={() => setActiveNav(anchor)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-250"
              style={{
                color: activeNav === anchor ? 'var(--amber)' : 'var(--muted)',
                background: activeNav === anchor ? 'var(--amber-dim)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (activeNav !== anchor) e.target.style.color = 'var(--ink)';
              }}
              onMouseLeave={e => {
                if (activeNav !== anchor) e.target.style.color = 'var(--muted)';
              }}
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => setShowFeedback(true)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-250"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >
            Feedback
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => { window.location.href = '/admin'; }}
            className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-250"
            style={{
              background: showAdminSection ? 'var(--amber)' : 'var(--cream)',
              color: showAdminSection ? 'white' : 'var(--ink)',
              border: '1px solid var(--border)',
            }}
          >
            <span>🔑</span>
            <span>Admin Panel</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: 'var(--paper-warm)',
              border: '1px solid var(--border)',
              color: 'var(--amber)',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark'
              ? <FiSun size={17} />
              : <FiMoon size={17} />
            }
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
            style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', color: 'var(--ink)' }}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="overflow-hidden transition-all duration-400 md:hidden"
        style={{
          maxHeight: isMenuOpen ? '360px' : '0px',
          opacity: isMenuOpen ? 1 : 0,
          borderTop: isMenuOpen ? '1px solid var(--border)' : 'none',
          background: 'var(--glass)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <nav className="space-y-1 px-6 py-4">
          {NAV_ITEMS.map(({ label, anchor }) => (
            <a
              key={label}
              href={anchor}
              className="block rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200"
              style={{ color: 'var(--ink)' }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dim)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setShowFeedback(true); setIsMenuOpen(false); }}
            className="block w-full rounded-2xl px-4 py-3 text-left text-base font-semibold text-white"
            style={{ background: 'var(--amber)' }}
          >
            ✉ Feedback
          </button>
          <button
            type="button"
            onClick={() => { window.location.href = '/admin'; setIsMenuOpen(false); }}
            className="block w-full rounded-2xl px-4 py-3 text-left text-base font-semibold"
            style={{
              background: showAdminSection ? 'var(--amber)' : 'var(--cream)',
              color: showAdminSection ? 'white' : 'var(--ink)',
            }}
          >
            🔑 Admin Panel
          </button>
        </nav>
      </div>
    </header>
  );
}
