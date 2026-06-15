import { useEffect, useRef, useState } from 'react';
import kulImage from '../assets/kul.png';

const TICKER_ITEMS = ['Investigative Stories', 'Hidden Truths', 'Untold News', 'Crime Coverage', 'Scam Exposés', 'Real Voices'];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden flex flex-col justify-center px-6 sm:px-8 lg:px-10 pt-10 pb-16">

      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--amber) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--amber) 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className={`relative mx-auto w-full max-w-7xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left — Text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="section-eyebrow anim-fade-up">
              Investigative Stories & Hidden Truths
            </div>

            {/* Headline */}
            <div className="anim-fade-up d150">
              <h1
                className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight"
                style={{ color: 'var(--ink)' }}
              >
                Expose the
                <em className="block not-italic shimmer-text mt-1">untold.</em>
              </h1>
            </div>

            <p
              className="max-w-lg text-lg leading-relaxed anim-fade-up d300"
              style={{ color: 'var(--muted)' }}
            >
              deepindiary is a striking editorial hub for fraud investigations, crime coverage, scam exposés, and news that matters — stories that demand to be told.
            </p>

            <div className="flex flex-wrap gap-3 anim-fade-up d400">
              <a href="#posts" className="btn-primary">
                Browse Stories
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#share-story" className="btn-ghost">
                Share Your Story
              </a>
            </div>

            {/* Stats */}

          </div>

          {/* Right — Profile Card */}
          <div className="relative anim-scale-in d200">
            {/* Floating badge */}
            <div
              className="absolute -top-5 -right-2 z-10 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg anim-float"
              style={{ background: 'var(--amber)', color: 'white' }}
            >
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold tracking-wide">Trending Now</span>
            </div>

            <div
              className="card rounded-[2.5rem] p-6 overflow-hidden"
              style={{ background: 'var(--paper)' }}
            >
              {/* Dark inner card */}
              <div
                className="rounded-[2rem] p-8 text-center space-y-5"
                style={{ background: 'var(--ink)', color: 'var(--paper)' }}
              >
                {/* Profile image */}
                <div className="relative inline-block">
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{ background: 'var(--amber)', transform: 'scale(0.85)' }}
                  />
                  <a href="https://www.instagram.com/deepindiary/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={kulImage}
                      alt="Kuldeep"
                      className="relative h-28 w-28 rounded-full object-cover transition duration-500 hover:scale-105"
                      style={{
                        border: '3px solid var(--amber)',
                        boxShadow: '0 0 40px rgba(200,137,58,0.3)',
                      }}
                    />
                  </a>
                  {/* Live indicator */}
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white" />
                </div>

                <div>
                  <p
                    className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
                    style={{ color: 'var(--amber)' }}
                  >Kuldeep Sharma</p>
                  <h2 className="font-display text-xl font-semibold leading-snug">
                    Every feeling deserves a page
                  </h2>
                  <p className="mt-3 text-sm leading-7 opacity-70 max-w-xs mx-auto">
                    A space where emotions, memories, and untold stories live forever in beautifully written words.
                  </p>
                </div>

                {/* Social badge */}
                <a
                  href="https://www.instagram.com/deepindiary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-80"
                  style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @deepindiary
                </a>
              </div>

              {/* Bottom mini stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: '📖', label: 'Memories', sub: 'Save moments' },
                  { icon: '✍️', label: 'Stories',  sub: 'Share emotions' },
                ].map(({ icon, label, sub }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 transition hover:-translate-y-1 duration-300"
                    style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}
                  >
                    <span className="text-xl">{icon}</span>
                    <p className="mt-2 text-xs font-semibold" style={{ color: 'var(--amber)' }}>{label}</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--ink)' }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t"
        style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
      >
        <div className="anim-marquee flex gap-12 whitespace-nowrap w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--amber)' }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
