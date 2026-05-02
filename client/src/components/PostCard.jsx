export default function PostCard({ post, onRead, onDelete, showDelete }) {
  return (
    <article
      className="card group overflow-hidden rounded-[2rem] cursor-pointer"
      onClick={() => onRead(post)}
      style={{ background: 'var(--paper)' }}
    >
      {post.imageData && (
        <div className="overflow-hidden" style={{ height: '220px' }}>
          <img
            src={post.imageData}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="tag">{post.category}</span>
          <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            {post.readTime} min read
          </span>
        </div>

        <h3
          className="font-display text-xl font-bold leading-snug transition-colors duration-200 group-hover:text-amber-500"
          style={{ color: 'var(--ink)' }}
        >
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
          {post.excerpt}
        </p>

        <div
          className="flex items-center gap-2 pt-2 text-xs font-medium border-t"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
        >
          <span>By <strong style={{ color: 'var(--ink)' }}>{post.author}</strong></span>
          <span style={{ color: 'var(--amber)' }}>·</span>
          <span>{new Date(post.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onRead(post); }}
            className="btn-primary text-xs px-4 py-2.5"
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.82rem' }}
          >
            Read Story →
          </button>
          {showDelete && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onDelete(post.id); }}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-80"
              style={{ background: '#dc2626', fontSize: '0.82rem' }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
