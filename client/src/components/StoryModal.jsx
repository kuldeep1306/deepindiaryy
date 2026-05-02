import { useEffect, useState } from 'react';

const REACTIONS = [
  { key: 'like',  emoji: '❤️',  label: 'Love it' },
  { key: 'fire',  emoji: '🔥',  label: 'On fire' },
  { key: 'cry',   emoji: '😢',  label: 'Touched' },
  { key: 'mind',  emoji: '🤯',  label: 'Mind blown' },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const STORAGE_KEY = id => `reaction_${id}`;

export default function StoryModal({ post, onClose }) {
  const [counts, setCounts]         = useState({ like: 0, fire: 0, cry: 0, mind: 0 });
  const [myReaction, setMyReaction] = useState(null);
  const [animating, setAnimating]   = useState(null);
  const [mounted, setMounted]       = useState(false);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    if (!post) { setMounted(false); return; }
    const t = setTimeout(() => setMounted(true), 20);
    const id = post._id || post.id;
    const saved = localStorage.getItem(STORAGE_KEY(id));
    if (saved) setMyReaction(saved);
    fetch(`${API_URL}/api/reactions/${id}`)
      .then(r => r.json())
      .then(data => setCounts(data))
      .catch(() => {});
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [post]);

  if (!post) return null;

  const handleReact = async (key) => {
    if (loading) return;
    const id = post._id || post.id;
    const prevReaction = myReaction;

    // Same reaction click = deselect (toggle off)
    if (myReaction === key) {
      setCounts(prev => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) - 1) }));
      setMyReaction(null);
      localStorage.removeItem(STORAGE_KEY(id));
      setLoading(true);
      try {
        await fetch(`${API_URL}/api/reactions/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reaction: key, remove: true }),
        });
      } catch {}
      setLoading(false);
      return;
    }

    // Switch reaction: undo old, add new
    setAnimating(key);
    setTimeout(() => setAnimating(null), 700);

    setCounts(prev => ({
      ...prev,
      ...(prevReaction ? { [prevReaction]: Math.max(0, (prev[prevReaction] || 0) - 1) } : {}),
      [key]: (prev[key] || 0) + 1,
    }));
    setMyReaction(key);
    localStorage.setItem(STORAGE_KEY(id), key);

    setLoading(true);
    try {
      await fetch(`${API_URL}/api/reactions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction: key, prevReaction: prevReaction || null }),
      });
    } catch {}
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto"
      style={{
        background: 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(16px)',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`mx-auto max-w-4xl my-10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div
          className="px-8 pt-8 pb-6 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="tag">{post.category}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                <span>By <strong style={{ color: 'var(--ink)' }}>{post.author}</strong></span>
                <span style={{ color: 'var(--amber)' }}>·</span>
                <span>{new Date(post.published).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span style={{ color: 'var(--amber)' }}>·</span>
                <span className="font-mono text-xs">{post.readTime} min read</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
              style={{ background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image */}
        {post.imageData && (
          <div className="overflow-hidden" style={{ maxHeight: '380px' }}>
            <img
              src={post.imageData}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: '380px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Body */}
        <div className="px-8 py-8 space-y-5">
          <p className="text-lg leading-8" style={{ color: 'var(--ink)' }}>{post.excerpt}</p>
          <p
            className="text-sm rounded-2xl px-4 py-3 border-l-4"
            style={{ borderColor: 'var(--amber)', background: 'var(--amber-dim)', color: 'var(--muted)' }}
          >
            📰 This is a preview. Full story is available on DeepInDiary's social channels.
          </p>
        </div>

        {/* Reactions */}
        <div
          className="px-8 py-8 border-t"
          style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
        >
          <p
            className="text-center text-sm font-medium mb-6"
            style={{ color: myReaction ? 'var(--amber)' : 'var(--muted)' }}
          >
            {myReaction
              ? '✅ Tap karke reaction badal sakte ho!'
              : 'Is story ne aapko kaise feel karaaya?'}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {REACTIONS.map(({ key, emoji, label }) => {
              const isChosen = myReaction === key;
              const isOther  = myReaction && myReaction !== key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleReact(key)}
                  disabled={loading}
                  title={isChosen ? 'Hatane ke liye dobara tap karo' : label}
                  className={`rxn-btn ${isChosen ? 'chosen' : ''} ${isOther ? 'other' : ''} ${animating === key ? 'anim-bounce' : ''}`}
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                >
                  <span className="rxn-emoji">{emoji}</span>
                  <span className="rxn-label">{label}</span>
                  <span className="rxn-count">{(counts[key] || 0).toLocaleString()}</span>
                </button>
              );
            })}
          </div>

          {myReaction && (
            <p className="text-center text-xs mt-4" style={{ color: 'var(--muted)' }}>
              💡 Kisi aur reaction par tap karo to badal jaayega
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
