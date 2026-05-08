'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div
      className="p-8 rounded-2xl"
      style={{ background: 'white', boxShadow: '0 4px 30px rgba(44,44,44,0.08)' }}
    >
      <h3
        className="font-display text-2xl font-bold mb-2"
        style={{ color: 'var(--charcoal)' }}
      >
        Send a Message
      </h3>
      <div className="divider-red mb-6" />

      {status === 'success' ? (
        <div
          className="text-center py-12"
          style={{ color: 'var(--charcoal)' }}
        >
          <p className="text-5xl mb-4">✅</p>
          <p className="font-bold text-xl mb-2">Message Sent!</p>
          <p className="text-sm" style={{ color: 'rgba(44,44,44,0.5)' }}>
            We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 btn-primary"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wide mb-1"
                style={{ color: 'var(--charcoal)' }}
              >
                Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wide mb-1"
                style={{ color: 'var(--charcoal)' }}
              >
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="08xx xxx xxxx"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide mb-1"
              style={{ color: 'var(--charcoal)' }}
            >
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide mb-1"
              style={{ color: 'var(--charcoal)' }}
            >
              Subject
            </label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="input-field"
            >
              <option value="">Select a subject</option>
              <option>Reservation / Table Booking</option>
              <option>Order Enquiry</option>
              <option>Feedback</option>
              <option>Catering / Events</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wide mb-1"
              style={{ color: 'var(--charcoal)' }}
            >
              Message *
            </label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
              rows={5}
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full py-4"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      )}
    </div>
  );
}