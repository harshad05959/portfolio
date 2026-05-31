import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);
  const [usingEthereal, setUsingEthereal] = useState<boolean | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) {
        // Try to parse JSON error, fall back to text
        let errText = 'Send failed';
        try {
          const data = await res.json();
          errText = data?.error || JSON.stringify(data);
        } catch (e) {
          try {
            errText = await res.text();
          } catch (_) {
            /* ignore */
          }
        }
        throw new Error(errText || 'Send failed');
      }

      // Try to parse JSON response; server may return a preview URL (Ethereal)
      let data: any = null;
      try {
        data = await res.json();
      } catch (_) {
        try {
          const txt = await res.text();
          data = txt ? { text: txt } : null;
        } catch (_) {
          data = null;
        }
      }

      // Keep diagnostic values internally (no UI exposure)
      if (data?.preview) setPreviewUrl(data.preview);
      if (data?.messageId) setMessageId(data.messageId);
      if (typeof data?.usingEthereal !== 'undefined') setUsingEthereal(Boolean(data.usingEthereal));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={5} placeholder="Tell me about your project" required />
      </label>
      <button className="button primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'success' && (
        <div style={{ color: 'var(--primary)', marginTop: 12 }}>
          <p>Message sent successfully — I will reply soon.</p>
          {usingEthereal === true && (
            <p style={{ margin: 4, color: '#b45309' }}>
              Note: email was sent through a test provider. Real delivery is not configured yet.
            </p>
          )}
          {usingEthereal === false && (
            <p style={{ margin: 4 }}>Delivered using the configured SMTP provider.</p>
          )}
          {previewUrl && (
            <p style={{ margin: 4 }}>
              Preview: <a href={previewUrl} target="_blank" rel="noreferrer">open</a>
            </p>
          )}
        </div>
      )}
      {status === 'error' && <p style={{ color: 'var(--muted)', marginTop: 12 }}>Failed to send message: {errorMsg}</p>}
    </form>
  );
}
