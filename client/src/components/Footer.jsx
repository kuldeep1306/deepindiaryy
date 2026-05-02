import { FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
    >
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)' }}
              >
                <span className="font-display font-bold text-white text-lg">D</span>
              </div>
              <span className="font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
                Deep<span style={{ color: 'var(--amber)' }}>InDiary</span>
              </span>
            </div>
            <p className="text-sm leading-6" style={{ color: 'var(--muted)' }}>
              Thoughts, stories &amp; emotions in one place. Your truth deserves to be heard.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/deepindiary/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{ background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@deepindiaryy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{ background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--amber)' }}>Navigate</p>
            <nav className="space-y-3">
              {['Home', 'Posts', 'Share Story', 'About'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-sm transition-colors hover:text-amber-500"
                  style={{ color: 'var(--muted)' }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--amber)' }}>Connect</p>
            <div className="space-y-3 text-sm" style={{ color: 'var(--muted)' }}>
              <p>📸 <a href="https://instagram.com/deepindiary" className="hover:underline" style={{ color: 'var(--amber)' }}>@deepindiary</a></p>
              <p>▶ <a href="https://youtube.com/@deepindiaryy" className="hover:underline" style={{ color: 'var(--amber)' }}>@deepindiaryy</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 py-4 sm:px-8 lg:px-10"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--muted)' }}>
          <p>© 2026 DeepInDiary · All rights reserved</p>
          <p>
            Made with <span style={{ color: 'var(--amber)' }}>❤</span> by{' '}
            <span className="font-semibold" style={{ color: 'var(--ink)' }}>Kuldeep Sharma</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
