export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Left card */}
        <div
          className="card rounded-[2rem] p-10 space-y-6"
          style={{ background: 'var(--paper)' }}
        >
          <div className="section-eyebrow">Why DeepInDiary</div>
          <h2 className="font-display text-3xl font-bold leading-tight" style={{ color: 'var(--ink)' }}>
            Stories people feel,<br />but rarely say.
          </h2>
          <p className="text-base leading-7" style={{ color: 'var(--muted)' }}>
            DeepInDiary is a space where silent emotions, untold truths, and real-life moments are turned into words that connect deeply with people.
          </p>
          <ul className="space-y-4">
            {[
              'Present real stories with clarity and meaningful perspective.',
              'Transform silent emotions into visually compelling narratives.',
              'Build stronger audience connection through authentic storytelling.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ background: 'var(--amber)' }}
                >
                  ✓
                </span>
                <span className="text-sm leading-6" style={{ color: 'var(--muted)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right card */}
        <div
          className="card rounded-[2rem] p-10 space-y-6 overflow-hidden relative"
          style={{ background: 'var(--paper-warm)' }}
        >
          {/* Decorative corner blob */}
          <div
            className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, var(--amber), transparent)' }}
          />

          <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>
            Turn emotions into<br />meaningful posts
          </h3>
          <p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>
            Write your thoughts, add a visual, and publish moments that stay in the minds of people long after they scroll.
          </p>

          <div className="grid gap-4">
            {[
              { icon: '📔', title: 'Story Driven',    desc: 'Every post feels like a page from a personal diary.' },
              { icon: '🤝', title: 'Deep Connection', desc: 'Content made to connect with people on a deeper level.' },
              { icon: '🔍', title: 'Truth First',     desc: 'We only publish stories that are real and verified.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-1 duration-300"
                style={{ background: 'var(--paper)', border: '1px solid var(--border)' }}
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{title}</p>
                  <p className="text-xs mt-1 leading-5" style={{ color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
