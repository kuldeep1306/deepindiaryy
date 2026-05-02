import { useState } from 'react';

export default function ShareStory({ apiUrl }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', story: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone, story } = form;
    if (!/^[6-9]\d{9}$/.test(phone)) { alert('Please enter a valid 10-digit mobile number.'); return; }
    if (!name || !email || !phone || !story) { alert('Please complete all fields.'); return; }
    try {
      const res = await fetch(`${apiUrl}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 429) { alert('Daily limit reached! Only 3 stories per day.'); return; }
      if (!res.ok) throw new Error(data.message || 'Failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', story: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section id="share-story" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      {/* Section heading */}
      <div className="mb-10 text-center space-y-3">
        <div className="flex items-center justify-center">
          <div className="section-eyebrow">Only for User Stories</div>
        </div>
        <h2 className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>
          Apki kahani,{' '}
          <span className="shimmer-text">hamari zubani</span>
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
          Share your personal experiences, untold truths, or stories that the world needs to hear.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Form card */}
        <div
          className="rounded-[2rem] p-8 sm:p-10"
          style={{ background: 'var(--paper)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-warm)' }}
        >
          {status === 'success' && (
            <div
              className="mb-6 rounded-2xl px-5 py-4 text-sm font-medium flex items-center gap-3"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a' }}
            >
              ✅ Thank you! Your story has been submitted successfully.
            </div>
          )}
          {status === 'error' && (
            <div
              className="mb-6 rounded-2xl px-5 py-4 text-sm font-medium flex items-center gap-3"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626' }}
            >
              ❌ Failed to submit. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Name</span>
                <input name="name" value={form.name} onChange={handleInput} className="input-field" placeholder="Your full name" />
              </label>
              <label className="space-y-2">
                <span className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</span>
                <input type="email" name="email" value={form.email} onChange={handleInput} className="input-field" placeholder="your@email.com" />
              </label>
              <label className="space-y-2">
                <span className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g,'').slice(0,10) }))}
                  maxLength={10}
                  className="input-field"
                  placeholder="10-digit mobile number"
                />
              </label>
            </div>
            <label className="space-y-2 block">
              <span className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Your Story</span>
              <textarea
                name="story"
                value={form.story}
                onChange={handleInput}
                rows="7"
                placeholder="Write your full story here..."
                className="input-field resize-none"
                style={{ borderRadius: '16px' }}
              />
            </label>
            <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
              Submit Your Story ✉
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Why share */}
          <div
            className="rounded-[2rem] p-7 space-y-4"
            style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)' }}
          >
            <div className="section-eyebrow">Why Share?</div>
            <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--ink)' }}>Your story matters</h3>
            <p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>
              Every story has the power to inspire, inform, or bring change. Share yours and let it reach those who need to hear it.
            </p>
            <div className="space-y-3 pt-2">
              {[
                { icon: '🔒', title: 'Confidential', desc: 'Contact info handled with care' },
                { icon: '✅', title: 'Reviewed', desc: 'Quality checks before publication' },
                { icon: '🌍', title: 'Wide Reach', desc: 'Across all our platforms' },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-2xl p-4"
                  style={{ background: 'var(--paper)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div
            className="rounded-[2rem] p-7 text-center space-y-4"
            style={{ background: 'linear-gradient(135deg, var(--amber), #7a4e18)', color: 'white' }}
          >
            <p className="font-mono text-xs tracking-widest uppercase opacity-80">Connect With Us</p>
            <p className="font-display text-xl font-bold">Follow DeepInDiary</p>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/deepindiary/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-white/20 hover:bg-white/30 transition"
              >
                📸 Instagram
              </a>
              <a
                href="https://www.youtube.com/@deepindiaryy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-white/20 hover:bg-white/30 transition"
              >
                ▶ YouTube
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
