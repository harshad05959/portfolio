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
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span className="label-text">Full Name</span>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          type="text" 
          name="name" 
          placeholder="John Doe" 
          required 
          disabled={status === 'sending'}
        />
      </label>
      <label>
        <span className="label-text">Email Address</span>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          name="email" 
          placeholder="you@example.com" 
          required 
          disabled={status === 'sending'}
        />
      </label>
      <label>
        <span className="label-text">Message</span>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          name="message" 
          rows={4} 
          placeholder="Tell me about your project or idea..." 
          required 
          disabled={status === 'sending'}
        />
      </label>
      <button 
        className="button primary" 
        type="submit" 
        disabled={status === 'sending'}
        style={{
          position: 'relative',
          background: status === 'sending' ? 'var(--primary)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
          transition: 'all 0.3s ease'
        }}
      >
        {status === 'sending' ? (
          <>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginRight: '8px' }}>⚡</span>
            Sending...
          </>
        ) : status === 'success' ? (
          <>✓ Message sent!</>
        ) : (
          'Send Message'
        )}
      </button>

      {status === 'success' && (
        <div 
          style={{ 
            color: 'var(--primary)', 
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            animation: 'slideInUp 0.4s ease'
          }}
        >
          <p style={{ margin: 0 }}>✓ Thank you! I'll get back to you soon.</p>
        </div>
      )}
      {status === 'error' && (
        <div 
          style={{ 
            color: '#ef4444', 
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            animation: 'slideInUp 0.4s ease'
          }}
        >
          <p style={{ margin: 0 }}>✗ Error: {errorMsg}</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .label-text {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text);
        }
      `}</style>
    </form>
  );
}
