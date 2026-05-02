import { useState } from 'react';

export default function FeedbackModal({ apiUrl, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { alert('Please fill all fields'); return; }
    try {
      const res = await fetch(`${apiUrl}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => { setStatus(null); onClose(); }, 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(16px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl anim-scale-in"
        style={{ background: 'var(--paper)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
        >
          <div>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--amber)' }}>Your Thoughts</p>
            <h2 className="font-display text-2xl font-bold mt-1" style={{ color: 'var(--ink)' }}>Send Feedback</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm transition hover:scale-110"
            style={{ background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)' }}
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-6">
          {status === 'success' && (
            <div
              className="mb-5 rounded-2xl px-4 py-3 text-sm font-medium text-center"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a' }}
            >
              ✅ Feedback submitted! Thank you.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="space-y-1.5 block">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Name</span>
              <input type="text" name="name" value={form.name} onChange={handleInput} className="input-field" placeholder="Your name" />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleInput} className="input-field" placeholder="your@email.com" />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInput}
                rows="4"
                className="input-field resize-none"
                style={{ borderRadius: '14px' }}
                placeholder="Share your thoughts..."
              />
            </label>
            <div className="flex gap-3 pt-1">
              <button type="submit" className="btn-primary flex-1 justify-center py-3">
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
                style={{ padding: '0.75rem 1.2rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
