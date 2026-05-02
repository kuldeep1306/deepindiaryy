export default function Trending({ posts, onRead, onDelete, showDelete }) {
  return (
    <section id="trending" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-12 text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="section-eyebrow">Spotlight</div>
        </div>
        <h2 className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>
          Trending This Week
        </h2>
        <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
          Stories moving hearts and sparking conversations
        </p>
      </div>

      {/* Trending list */}
      <div className="space-y-5">
        {posts.slice(0, 3).length > 0 ? (
          posts.slice(0, 3).map((post, index) => (
            <div
              key={post.id}
              className="card group rounded-[2rem] overflow-hidden cursor-pointer"
              onClick={() => onRead(post)}
              style={{ background: 'var(--paper)' }}
            >
              <div className="flex items-start gap-0">
                {/* Rank number */}
                <div
                  className="flex-shrink-0 w-20 flex items-center justify-center font-display text-6xl font-bold self-stretch"
                  style={{
                    color: index === 0 ? 'var(--amber)' : 'var(--border)',
                    background: 'var(--paper-warm)',
                    borderRight: '1px solid var(--border)',
                    opacity: index === 0 ? 1 : 0.5,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Image */}
                {post.imageData && (
                  <div className="hidden sm:block flex-shrink-0 overflow-hidden" style={{ width: '160px', minHeight: '120px' }}>
                    <img
                      src={post.imageData}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      style={{ minHeight: '120px' }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="tag">{post.category}</span>
                    {index === 0 && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white"
                        style={{ background: 'var(--amber)' }}
                      >
                        🔥 Hot
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-amber-500"
                    style={{ color: 'var(--ink)' }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                    <span>By <strong style={{ color: 'var(--ink)' }}>{post.author}</strong></span>
                    <span style={{ color: 'var(--amber)' }}>·</span>
                    <span>{new Date(post.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span style={{ color: 'var(--amber)' }}>·</span>
                    <span className="font-mono">{post.readTime} min read</span>

                    <div className="ml-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); onRead(post); }}
                        className="btn-primary"
                        style={{ padding: '0.45rem 1.1rem', fontSize: '0.78rem' }}
                      >
                        Read Story →
                      </button>
                      {showDelete && (
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); onDelete(post.id); }}
                          className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
                          style={{ background: '#dc2626' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="rounded-[2rem] p-16 text-center"
            style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">📰</p>
            <p className="font-display text-xl font-semibold" style={{ color: 'var(--ink)' }}>No stories yet</p>
            <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
              Be the first to{' '}
              <a href="#share-story" className="font-semibold" style={{ color: 'var(--amber)' }}>share your story →</a>
            </p>
          </div>
        )}
      </div>

      {/* Feature cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          { emoji: '🔥', title: 'Hot Stories',  desc: 'Stories gaining momentum and making waves across platforms' },
          { emoji: '💖', title: 'Most Felt',    desc: 'Emotionally resonant narratives that touch hearts deeply' },
          { emoji: '⚡', title: 'Just Published', desc: 'Fresh perspectives and brand new stories published today' },
        ].map(({ emoji, title, desc }, i) => (
          <div
            key={title}
            className="card rounded-[2rem] p-7 space-y-3 anim-fade-up"
            style={{ animationDelay: `${i * 0.1}s`, background: 'var(--paper)' }}
          >
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
              style={{ background: 'var(--amber-dim)', border: '1px solid var(--border)' }}
            >
              {emoji}
            </div>
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--ink)' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
