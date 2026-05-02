import PostCard from './PostCard';

export default function Posts({ posts, search, setSearch, categoryFilter, onRead, onDelete, showDelete }) {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10" id="posts">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="section-eyebrow anim-fade-up">Latest Articles</div>
          <h2 className="font-display text-4xl font-bold anim-fade-up d100" style={{ color: 'var(--ink)' }}>
            {categoryFilter ? `${categoryFilter} Stories` : 'Featured Stories'}
          </h2>
        </div>

        {/* Search */}
        <div className="w-full max-w-sm anim-fade-up d200">
          <div className="relative group">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search stories..."
              className="input-field pr-12 rounded-full"
              style={{ borderRadius: '100px', paddingRight: '3rem' }}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base transition-all duration-300 group-focus-within:scale-110"
              style={{ color: 'var(--amber)' }}
            >
              ⌕
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
        {posts.length === 0 ? (
          <div
            className="col-span-3 rounded-[2rem] p-16 text-center"
            style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}
          >
            <p className="text-4xl mb-4">📖</p>
            <p className="font-display text-xl font-semibold" style={{ color: 'var(--ink)' }}>No stories found</p>
            <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Try a different search term</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <div key={post.id} className={`anim-fade-up`} style={{ animationDelay: `${i * 0.06}s` }}>
              <PostCard
                post={post}
                onRead={onRead}
                onDelete={onDelete}
                showDelete={showDelete}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
