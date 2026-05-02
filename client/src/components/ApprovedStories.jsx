import { useState, useEffect } from 'react';

export default function ApprovedStories({ apiUrl }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/submissions/approved`)
      .then(r => r.json())
      .then(data => { setStories(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [apiUrl]);

  if (loading) return null;
  if (stories.length === 0) return null;

  return (
    <section id="reader-stories" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      {/* Heading */}
      <div className="mb-10 text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="section-eyebrow">Community Voices</div>
        </div>
        <h2 className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>
          Reader{' '}
          <span className="shimmer-text">Stories</span>
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
          Real stories submitted by our readers — reviewed and approved by our team.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {stories.map(story => {
          const isOpen = expanded === story._id;
          const preview = story.story.length > 200 ? story.story.slice(0, 200) + '…' : story.story;
          return (
            <article key={story._id}
              className="rounded-[2rem] overflow-hidden transition-all"
              style={{ background: 'var(--paper)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-warm)' }}>
              <div className="p-6 space-y-4">
                {/* Author row */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-base shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--amber, #d97706), #7a4e18)' }}>
                    {story.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{story.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {new Date(story.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-semibold rounded-full px-3 py-1"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#15803d' }}>
                    ✅ Verified
                  </span>
                </div>

                {/* Story text */}
                <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: 'var(--ink)' }}>
                  {isOpen ? story.story : preview}
                </p>

                {story.story.length > 200 && (
                  <button onClick={() => setExpanded(isOpen ? null : story._id)}
                    className="text-xs font-semibold transition-all"
                    style={{ color: 'var(--amber)' }}>
                    {isOpen ? '▲ Read less' : '▼ Read full story'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
