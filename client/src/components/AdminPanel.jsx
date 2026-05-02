import { useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────
// Shared input style
// ─────────────────────────────────────────────────────────
const INPUT_CLASS =
  'w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all ' +
  'focus:ring-2 placeholder:opacity-40';
const INPUT_STYLE = (focused = false) => ({
  border: focused ? '1.5px solid var(--amber)' : '1.5px solid var(--border)',
  color: 'var(--ink)',
  background: 'var(--paper-warm)',
  boxShadow: focused ? '0 0 0 3px var(--amber-dim)' : 'none',
});


// ── Chai Cup Animation ──────────────────────────────────────
function ChaiCup({ size = 1, style = {} }) {
  return (
    <div style={{ transform: `scale(${size})`, transformOrigin: 'bottom center', ...style }}>
      <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
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
        <path d="M8 18 L10 46 Q10 48 12 48 L36 48 Q38 48 38 46 L40 18 Z" fill="rgba(200,137,58,0.15)" stroke="rgba(200,137,58,0.5)" strokeWidth="1.2"/>
        <ellipse cx="24" cy="21" rx="15.5" ry="3" fill="rgba(180,110,30,0.4)" stroke="rgba(200,137,58,0.4)" strokeWidth="0.8"/>
        <path d="M8.6 21 L10 46 Q10 48 12 48 L36 48 Q38 48 38 46 L39.4 21 Z" fill="rgba(150,80,20,0.25)"/>
        <path d="M40 24 Q50 24 50 32 Q50 40 40 40" stroke="rgba(200,137,58,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="24" cy="51" rx="20" ry="3.5" fill="rgba(200,137,58,0.12)" stroke="rgba(200,137,58,0.35)" strokeWidth="1"/>
        <ellipse cx="20" cy="21" rx="5" ry="1" fill="rgba(255,220,150,0.3)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
        </ellipse>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Sidebar Nav
// ─────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'overview',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    label: 'Overview',
  },
  {
    id: 'submissions',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    label: 'Submissions',
  },
  {
    id: 'addpost',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    label: 'Publish Post',
  },
  {
    id: 'feedback',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    label: 'Feedback',
  },
];

// ─────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden group transition-all hover:-translate-y-0.5"
      style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-warm)' }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 opacity-[0.06] transition-opacity group-hover:opacity-[0.1]"
        style={{ background: accent }} />
      <div className="flex items-start justify-between mb-3">
        <div className="h-9 w-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, color: accent }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black mb-0.5" style={{ color: 'var(--ink)' }}>{value}</p>
      <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>{label}</p>
      {sub && <p className="text-xs mt-1 opacity-60" style={{ color: 'var(--muted)' }}>{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Overview Tab
// ─────────────────────────────────────────────────────────
function OverviewTab({ apiUrl, adminPassword }) {
  const [counts, setCounts] = useState({ submissions: 0, posts: 0, feedback: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiUrl || !adminPassword) return;
    const fetchAll = async () => {
      try {
        const [subRes, postRes, fbRes] = await Promise.all([
          fetch(`${apiUrl}/api/admin/submissions?password=${encodeURIComponent(adminPassword)}&status=all`),
          fetch(`${apiUrl}/api/posts`),
          fetch(`${apiUrl}/api/admin/feedback?password=${encodeURIComponent(adminPassword)}`),
        ]);
        const [subs, posts, feedbacks] = await Promise.all([subRes.json(), postRes.json(), fbRes.json()]);
        const totalSubs   = Array.isArray(subs)      ? subs.length      : 0;
        const totalPosts  = Array.isArray(posts)      ? posts.length     : 0;
        const totalFb     = Array.isArray(feedbacks)  ? feedbacks.length : 0;
        const pending     = Array.isArray(subs)       ? subs.filter(s => s.status === 'pending').length : 0;
        setCounts({ submissions: totalSubs, posts: totalPosts, feedback: totalFb, pending });
      } catch (e) { console.error('Overview fetch error:', e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, [apiUrl, adminPassword]);

  const fmt = (n) => loading ? '…' : n;

  const stats = [
    {
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
      label: 'Total Submissions', value: fmt(counts.submissions), sub: 'All time', accent: '#c8893a',
    },
    {
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Published Posts', value: fmt(counts.posts), sub: 'Live on site', accent: '#16a34a',
    },
    {
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
      label: 'Reader Feedback', value: fmt(counts.feedback), sub: 'Messages received', accent: '#0ea5e9',
    },
    {
      icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Pending Review', value: fmt(counts.pending), sub: 'Need attention', accent: '#f59e0b',
    },
  ];

  const quickLinks = [
    { id: 'submissions', label: 'Review Submissions', desc: 'Approve or reject user stories', icon: '📬', color: '#c8893a' },
    { id: 'addpost', label: 'Publish a Story', desc: 'Add a new post to the site', icon: '✍️', color: '#16a34a' },
    { id: 'feedback', label: 'Read Feedback', desc: 'Messages from your readers', icon: '💬', color: '#0ea5e9' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--muted)' }}>Quick Actions</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {quickLinks.map(({ label, desc, icon, color }) => (
            <div key={label} className="group rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-3">{icon}</div>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color }}>
                Open <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1610 60%, #141210 100%)', border: '1px solid rgba(200,137,58,0.2)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--amber), transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(200,137,58,0.7)' }}>DeepInDiary Mission</p>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Voices Behind Untold Stories</h3>
            <ChaiCup size={0.7} style={{ opacity: 0.8, flexShrink: 0, marginLeft: '12px' }} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,227,0.5)', maxWidth: '520px' }}>
            DeepInDiary exists to uncover hidden truths, expose silent pain, and give space to stories that are often ignored.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {['🔍 Hidden Truths', '💔 Human Emotions', '⚠️ Scam Exposure'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(200,137,58,0.1)', border: '1px solid rgba(200,137,58,0.2)', color: 'rgba(200,137,58,0.8)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Add Post Tab
// ─────────────────────────────────────────────────────────
function AddPostTab({ apiUrl, onPostAdded, adminPassword }) {
  const [form, setForm] = useState({
    title: '', author: '', category: '',
    published: new Date().toISOString().slice(0, 10),
    readTime: '', excerpt: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) { setImagePreview(''); return; }
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { title, author, category, published, readTime, excerpt } = form;
    if (!title || !author || !category || !published || !readTime || !excerpt) {
      alert('Please complete every field before submitting.');
      return;
    }
    setSubmitting(true);
    const newPost = {
      id: Date.now(), title, author, category, published,
      readTime: Number(readTime), excerpt, imageData: imagePreview,
    };
    try {
      const res = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: newPost, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save post');
      onPostAdded(data);
      setSuccess(true);
      setForm({ title: '', author: '', category: '', published: new Date().toISOString().slice(0, 10), readTime: '', excerpt: '' });
      setImagePreview('');
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) { alert(err.message); }
    finally { setSubmitting(false); }
  };

  const fields = [
    { label: 'Story Title', name: 'title', placeholder: 'Enter a compelling title…', span: 2 },
    { label: 'Author Name', name: 'author', placeholder: 'Who wrote this?', span: 1 },
    { label: 'Category', name: 'category', placeholder: 'e.g. Personal, Scam, etc.', span: 1 },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-warm)' }}>
        <div className="px-7 py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-0.5" style={{ color: 'var(--amber)' }}>Admin Only</p>
            <h2 className="text-xl font-black" style={{ color: 'var(--ink)', fontFamily: "'Playfair Display', serif" }}>Publish New Story</h2>
          </div>
          {success && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.3)', color: '#15803d' }}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Published!
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map(({ label, name, placeholder, span }) => (
              <label key={name} className={`block ${span === 2 ? 'sm:col-span-2' : ''}`}>
                <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>{label}</span>
                <input name={name} value={form[name]} onChange={handleInput} placeholder={placeholder}
                  className={INPUT_CLASS} style={INPUT_STYLE()} />
              </label>
            ))}
            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Publish Date</span>
              <input type="date" name="published" value={form.published} onChange={handleInput}
                className={INPUT_CLASS} style={INPUT_STYLE()} />
            </label>
            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Read Time (min)</span>
              <input type="number" name="readTime" min="1" value={form.readTime} onChange={handleInput}
                placeholder="e.g. 5" className={INPUT_CLASS} style={INPUT_STYLE()} />
            </label>
            <label className="block sm:col-span-2">
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Cover Image</span>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageChange} id="cover-upload" className="sr-only" />
                <label htmlFor="cover-upload" className="flex items-center gap-3 rounded-xl px-4 py-3.5 cursor-pointer transition-all hover:opacity-80"
                  style={{ background: 'var(--paper)', border: '1.5px dashed var(--border)', color: 'var(--muted)' }}>
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-medium">{imagePreview ? 'Change image' : 'Click to upload cover image'}</span>
                  {imagePreview && <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(22,163,74,0.1)', color: '#15803d' }}>✓ Loaded</span>}
                </label>
              </div>
            </label>
            {imagePreview && (
              <div className="sm:col-span-2 rounded-xl overflow-hidden relative">
                <img src={imagePreview} alt="Preview" className="h-44 w-full object-cover" />
                <button type="button" onClick={() => setImagePreview('')}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>✕</button>
              </div>
            )}
            <label className="block sm:col-span-2">
              <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Excerpt</span>
              <textarea name="excerpt" value={form.excerpt} onChange={handleInput} rows={5}
                placeholder="Write a short summary or teaser for the story…"
                className={INPUT_CLASS + ' resize-none'} style={{ ...INPUT_STYLE(), minHeight: '120px' }} />
            </label>
          </div>
          <button type="submit" disabled={submitting}
            className="w-full rounded-xl py-4 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0a0a0f, #1a1610)', color: 'var(--amber)', border: '1px solid rgba(200,137,58,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            {submitting ? (
              <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Publishing…</>
            ) : (
              <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>Publish Story</>
            )}
          </button>
        </form>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl p-5 text-sm space-y-3" style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--amber)' }}>Tips</p>
          {[
            { icon: '📝', tip: 'Write a clear, punchy title that grabs attention.' },
            { icon: '🖼️', tip: 'A high-quality cover image increases engagement.' },
            { icon: '⏱️', tip: 'Accurate read time sets expectations.' },
            { icon: '✍️', tip: 'Write What you Feel.' },
          ].map(({ icon, tip }) => (
            <div key={tip} className="flex gap-2.5">
              <span className="text-base flex-shrink-0">{icon}</span>
              <p style={{ color: 'var(--muted)' }}>{tip}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #0a0a0f, #141210)', border: '1px solid rgba(200,137,58,0.15)' }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(200,137,58,0.6)' }}>Remember</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,227,0.45)' }}>
            Posts published here go live immediately to all readers. Double-check for typos before submitting.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Submissions Tab
// ─────────────────────────────────────────────────────────
const STATUS = {
  pending:  { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  text: '#b45309',  dot: '#f59e0b', label: 'Pending' },
  approved: { bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.25)',  text: '#15803d',  dot: '#22c55e', label: 'Approved' },
  rejected: { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.22)',  text: '#dc2626',  dot: '#ef4444', label: 'Rejected' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function SubmissionsTab({ apiUrl, adminPassword }) {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // ✅ FIX: guard added — password nahi hai toh fetch mat karo
  const fetchSubmissions = useCallback(async () => {
    if (!adminPassword) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/submissions?password=${encodeURIComponent(adminPassword)}&status=${filter}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubmissions(data);
    } catch (err) { alert('Error: ' + err.message); }
    finally { setLoading(false); }
  }, [apiUrl, adminPassword, filter]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubmissions(prev => prev.map(s => s._id === id
        ? { ...s, status: action === 'approve' ? 'approved' : 'rejected' } : s));
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this submission permanently?')) return;
    try {
      const res = await fetch(`${apiUrl}/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubmissions(prev => prev.filter(s => s._id !== id));
    } catch (err) { alert(err.message); }
  };

  const FILTERS = ['all', 'pending', 'approved', 'rejected'];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl w-fit"
        style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all"
            style={{ background: filter === f ? 'var(--ink)' : 'transparent', color: filter === f ? 'var(--paper)' : 'var(--muted)' }}>
            {f === 'all' ? 'All' : f === 'pending' ? '⏳ Pending' : f === 'approved' ? '✓ Approved' : '✕ Rejected'}
          </button>
        ))}
        <button onClick={fetchSubmissions}
          className="ml-2 rounded-xl px-3 py-2 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
          style={{ color: 'var(--muted)' }}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>

      <p className="text-xs px-1" style={{ color: 'var(--muted)' }}>
        <strong style={{ color: 'var(--ink)' }}>{submissions.length}</strong> {filter === 'all' ? 'total' : filter} submission{submissions.length !== 1 ? 's' : ''}
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-8 w-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--amber)' }} />
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Loading submissions…</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
          <div className="text-4xl mb-3">📭</div>
          <p className="font-bold" style={{ color: 'var(--ink)' }}>No {filter !== 'all' ? filter : ''} submissions</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Check back later or change the filter.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map(sub => {
            const isOpen = expanded === sub._id;
            return (
              <div key={sub._id} className="rounded-2xl overflow-hidden transition-all"
                style={{ background: 'var(--paper-warm)', border: `1px solid ${isOpen ? 'rgba(200,137,58,0.3)' : 'var(--border)'}`, boxShadow: isOpen ? '0 4px 24px rgba(200,137,58,0.08)' : 'none' }}>
                <div className="flex flex-wrap items-center gap-3 px-5 py-4 cursor-pointer select-none"
                  onClick={() => setExpanded(isOpen ? null : sub._id)}>
                  <StatusBadge status={sub.status} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate" style={{ color: 'var(--ink)' }}>{sub.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted)' }}>{sub.email} · {sub.phone}</p>
                  </div>
                  <p className="text-xs hidden sm:block" style={{ color: 'var(--muted)' }}>
                    {new Date(sub.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isOpen && (
                  <div className="border-t px-5 pb-5 pt-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="rounded-xl p-5 text-sm leading-7 whitespace-pre-wrap"
                      style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--border)' }}>
                      {sub.story}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {sub.status !== 'approved' && (
                        <button onClick={() => handleAction(sub._id, 'approve')}
                          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg, #15803d, #16a34a)', boxShadow: '0 2px 12px rgba(22,163,74,0.3)' }}>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          Approve & Publish
                        </button>
                      )}
                      {sub.status !== 'rejected' && (
                        <button onClick={() => handleAction(sub._id, 'reject')}
                          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)', boxShadow: '0 2px 12px rgba(245,158,11,0.3)' }}>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                          Reject
                        </button>
                      )}
                      <button onClick={() => handleDelete(sub._id)}
                        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#dc2626' }}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Feedback Tab
// ─────────────────────────────────────────────────────────
function FeedbackTab({ apiUrl, adminPassword }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  // Track which feedback IDs have been read (opened) — stored in localStorage
  const READ_KEY = 'deepindiary_read_feedback';
  const [readIds, setReadIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || '[]')); }
    catch { return new Set(); }
  });

  const markRead = (id) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(READ_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  // ✅ FIX: guard added — password nahi hai toh fetch mat karo
  const fetchFeedbacks = useCallback(async () => {
    if (!adminPassword) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/feedback?password=${encodeURIComponent(adminPassword)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setFeedbacks(data);
    } catch (err) { alert('Error: ' + err.message); }
    finally { setLoading(false); }
  }, [apiUrl, adminPassword]);

  useEffect(() => { fetchFeedbacks(); }, [fetchFeedbacks]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this feedback permanently?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${apiUrl}/api/admin/feedback/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setFeedbacks(prev => prev.filter(f => f._id !== id));
      // Remove from readIds too
      setReadIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        try { localStorage.setItem(READ_KEY, JSON.stringify([...next])); } catch {}
        return next;
      });
    } catch (err) { alert(err.message); }
    finally { setDeletingId(null); }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const total = feedbacks.length;
  const thisMonth = feedbacks.filter(f => {
    const d = new Date(f.createdAt), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const unread = feedbacks.filter(f => !readIds.has(String(f._id))).length;

  const PALETTE = ['#c8893a', '#0ea5e9', '#a855f7', '#ec4899', '#22c55e', '#f97316'];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '💬', label: 'Total', value: total, color: '#c8893a' },
          { icon: '📅', label: 'This Month', value: thisMonth, color: '#0ea5e9' },
          { icon: '📬', label: 'Unread', value: unread, color: '#a855f7' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className="rounded-2xl p-4 text-center" style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
            <p className="text-xl mb-1">{icon}</p>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>{total}</strong> message{total !== 1 ? 's' : ''} from readers
        </p>
        <button onClick={fetchFeedbacks}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all hover:opacity-80"
          style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-8 w-8 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--amber)' }} />
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Loading feedback…</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
          <div className="text-4xl mb-3">💭</div>
          <p className="font-bold" style={{ color: 'var(--ink)' }}>No feedback yet</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Readers haven't sent any messages yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {feedbacks.map((fb, i) => {
            const isOpen = expanded === fb._id;
            const color = PALETTE[i % PALETTE.length];
            return (
              <div key={fb._id} className="rounded-2xl overflow-hidden transition-all"
                style={{ background: 'var(--paper-warm)', border: `1px solid ${isOpen ? 'rgba(200,137,58,0.3)' : 'var(--border)'}` }}>
                <div className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
                  onClick={() => { setExpanded(isOpen ? null : fb._id); if (!isOpen) markRead(String(fb._id)); }}>
                  <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: color, boxShadow: `0 2px 8px ${color}40` }}>
                    {fb.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--ink)' }}>
                      {fb.name}
                      {!readIds.has(String(fb._id)) && (
                        <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: '#a855f7' }} />
                      )}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{fb.message}</p>
                  </div>
                  <p className="text-xs hidden sm:block flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    {formatDate(fb.createdAt)}
                  </p>
                  <svg className={`h-4 w-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {isOpen && (
                  <div className="border-t px-5 pb-5 pt-4 space-y-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="rounded-xl p-5 relative" style={{ background: 'var(--paper)', border: '1px solid var(--border)' }}>
                      <span className="text-3xl leading-none absolute -top-1 left-4 font-serif opacity-20" style={{ color }}>❝</span>
                      <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--ink)' }}>{fb.message}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ background: 'var(--amber-dim)', border: '1px solid var(--amber-glow)', color: 'var(--amber)' }}>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {fb.email}
                      </span>
                      <button onClick={() => handleDelete(fb._id)} disabled={deletingId === fb._id}
                        className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}>
                        {deletingId === fb._id ? 'Deleting…' : (
                          <><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main AdminPanel
// ─────────────────────────────────────────────────────────
export default function AdminPanel({ apiUrl, onPostAdded, adminPassword, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTabData = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--paper)', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform lg:relative lg:translate-x-0 lg:flex ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--paper-warm)', borderRight: '1px solid var(--border)' }}>

        <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)', boxShadow: '0 0 16px rgba(200,137,58,0.3)' }}>
            <span className="text-white font-black text-base">D</span>
          </div>
          <div>
            <p className="font-black text-sm" style={{ color: 'var(--ink)' }}>DeepInDiary</p>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>Admin Panel</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: 'var(--muted)' }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 mb-3" style={{ color: 'var(--muted)' }}>Navigation</p>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all text-left"
                style={{
                  background: isActive ? 'var(--amber-dim)' : 'transparent',
                  color: isActive ? 'var(--amber)' : 'var(--muted)',
                  border: isActive ? '1px solid var(--amber-glow)' : '1px solid transparent',
                }}>
                <span style={{ opacity: isActive ? 1 : 0.6 }}>{tab.icon}</span>
                {tab.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: 'var(--amber)' }} />}
              </button>
            );
          })}
        </nav>

          
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4"
          style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}>
          <button className="lg:hidden rounded-xl p-2 transition-all hover:opacity-70"
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', color: 'var(--ink)' }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div>
            <h1 className="font-black text-base" style={{ color: 'var(--ink)', fontFamily: "'Playfair Display', serif" }}>
              {activeTabData?.label}
            </h1>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>DeepInDiary Admin Console</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0a0a0f, #1a1610)' }}>A</div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: 'var(--ink)' }}>Administrator</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                <p className="text-[10px]" style={{ color: 'var(--muted)' }}>Online</p>
              </div>
            </div>
            <ChaiCup size={0.55} style={{ opacity: 0.75, marginLeft: 'auto', flexShrink: 0 }} />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-auto">
          {activeTab === 'overview'    && <OverviewTab apiUrl={apiUrl} adminPassword={adminPassword} />}
          {activeTab === 'submissions' && <SubmissionsTab apiUrl={apiUrl} adminPassword={adminPassword} />}
          {activeTab === 'addpost'     && <AddPostTab apiUrl={apiUrl} onPostAdded={onPostAdded} adminPassword={adminPassword} />}
          {activeTab === 'feedback'    && <FeedbackTab apiUrl={apiUrl} adminPassword={adminPassword} />}
        </main>
      </div>
    </div>
  );
}
