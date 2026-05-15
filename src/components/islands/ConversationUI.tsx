import { useState, useCallback } from 'react';

interface Step {
  message: string;
  emphasis?: string;
  placeholder: string;
}

interface ValidationMessages {
  name?: string;
  email?: string;
  emailInvalid?: string;
  topic?: string;
}

interface Props {
  steps: Step[];
  sendLabel: string;
  sendingLabel: string;
  successTitle: string;
  successMsg: string;
  errorMsg: string;
  validation: ValidationMessages;
}

interface FormData {
  name: string;
  email: string;
  topic: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
}

export default function ConversationUI({
  steps,
  sendLabel,
  sendingLabel,
  successTitle,
  successMsg,
  errorMsg,
  validation,
}: Props) {
  const [form, setForm] = useState<FormData>({ name: '', email: '', topic: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = validation.name;
    if (!form.email.trim()) {
      next.email = validation.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = validation.emailInvalid;
    }
    if (!form.topic.trim()) next.topic = validation.topic;
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form, validation]);

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: document.documentElement.lang || 'en' }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({ topic: errorMsg });
      }
    } catch {
      setErrors({ topic: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg,#c27a5c,#7a4532)',
          margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="20" height="20">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: '0 0 8px' }}>{successTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{successMsg}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: i === 0 ? 1 : i === 1 ? 0.85 : 0.7,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg,#c27a5c,#7a4532)',
              flexShrink: 0, marginTop: 2,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 35%, rgba(255,240,220,0.3) 0 22%, transparent 24%), radial-gradient(ellipse at 50% 80%, rgba(30,20,15,0.4) 0 40%, transparent 55%)',
              }} />
            </div>
            <div style={{
              background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '16px 16px 16px 4px',
              padding: '12px 18px', fontSize: 14.5, lineHeight: 1.55, maxWidth: 440, color: 'var(--ink)',
            }}>
              {step.message}{' '}
              {step.emphasis && (
                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{step.emphasis}</span>
              )}
            </div>
          </div>
          <input
            type={i === 1 ? 'email' : 'text'}
            placeholder={step.placeholder}
            value={form[['name', 'email', 'topic'][i] as keyof FormData]}
            onChange={(e) => {
              const key = ['name', 'email', 'topic'][i] as keyof FormData;
              setForm((prev) => ({ ...prev, [key]: e.target.value }));
              if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
            }}
            style={{
              marginLeft: 44,
              padding: '10px 2px 10px 14px',
              border: 'none',
              borderBottom: `1px solid ${errors[['name', 'email', 'topic'][i] as keyof FormErrors] ? 'var(--accent)' : 'var(--border-2)'}`,
              background: 'transparent',
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 17,
              color: 'var(--ink)',
              outline: 'none',
              width: 'calc(100% - 44px)',
              maxWidth: 400,
            }}
          />
          {errors[['name', 'email', 'topic'][i] as keyof FormErrors] && (
            <div style={{ marginLeft: 44, fontSize: 12, color: 'var(--accent)' }}>
              {errors[['name', 'email', 'topic'][i] as keyof FormErrors]}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginLeft: 44, marginTop: 10 }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn btn-primary"
          style={{
            padding: '12px 26px',
            fontSize: 13.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? sendingLabel : sendLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="contact-sidebar" style={{
        position: 'absolute',
        top: 40,
        right: -40,
        width: 260,
        padding: '18px 20px',
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>
          <span style={{
            display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
            background: 'var(--accent)', marginRight: 7, verticalAlign: 'middle',
          }} />
          CURRENT WORK
        </div>
        <div className="serif" style={{ fontSize: 17, fontStyle: 'italic', lineHeight: 1.3, margin: '0 0 8px' }}>
          Neural Architecture for LLM Orchestration
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 14px' }}>
          A study on efficient prompt routing and vector memory optimization.
        </div>
        <a href="/projects" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 600, textDecoration: 'none' }}>
          VIEW PAPER →
        </a>
      </div>
    </div>
  );
}
