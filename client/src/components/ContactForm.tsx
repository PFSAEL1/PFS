import { useState, type FormEvent } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { QUOTE_CONVERSION_DESTINATION } from '@/lib/quoteConversion';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  booth: string;
  filterNeeds: string;
  message: string;
  website: string;
};

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  booth: '',
  filterNeeds: '',
  message: '',
  website: '',
};

const FIELD_CLASS = 'min-h-11 w-full rounded-lg border border-white/30 bg-[#111] px-3 text-base leading-normal text-white outline-none placeholder:text-[#cfcfcf] focus:border-[#8ec5ff]';

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [startedAt] = useState(() => Date.now());
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const setField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (form.name.trim().length < 2 || form.booth.trim().length < 2 || form.filterNeeds.trim().length < 2 || form.message.trim().length < 8) {
      setError('Name, booth make/model, filter needs, and a short message are required.');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt }),
      });
      const payload = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !payload?.ok) {
        setStatus('idle');
        setError(payload?.error || 'We could not send your request. Please call us or try again.');
        return;
      }
      const trackingWindow = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
      trackingWindow.dataLayer = trackingWindow.dataLayer || [];
      trackingWindow.dataLayer.push({
        event: 'google_ads_quote_conversion',
        send_to: QUOTE_CONVERSION_DESTINATION,
        transaction_id: crypto.randomUUID(),
      });
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError('We could not send your request. Please call us or try again.');
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-background to-muted/30 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-semibold">Get In Touch</h1>
          <p className="mx-auto max-w-[62ch] text-lg leading-[1.6] text-white">
            Have questions about our filters? Need a custom size or bulk pricing? Our team is ready to help.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'Phone', value: PHONE_DISPLAY, href: PHONE_TEL },
                  { icon: MapPin, label: 'Location', value: 'Santa Rosa, CA', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 rounded-lg border border-[#3a3a3a] bg-[#161616] p-4">
                    <div className="rounded-lg bg-[#0066cc]/20 p-2">
                      <Icon className="h-5 w-5 text-[#9ecbff]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#d7d7d7]">{label}</p>
                      {href ? (
                        <a href={href} className="text-base font-semibold text-white hover:text-[#9ecbff]">{value}</a>
                      ) : (
                        <p className="text-base font-semibold text-white">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#0066cc]/40 bg-[#0066cc]/10 p-6">
              <h3 className="mb-2 font-semibold">Need a Custom Quote?</h3>
              <p className="max-w-[62ch] text-base leading-[1.6] text-white">
                Share your booth make/model, filter stage, dimensions and quantity. Our team will review the details and help you find suitable options.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#3a3a3a] bg-[#111111] p-6 md:p-8">
            <h2 className="mb-5 text-xl font-semibold">Request a Quote or Get Help</h2>
            {status === 'sent' ? (
              <p role="status" className="max-w-[62ch] text-base leading-[1.6] text-white">
                Request received. A member of the PFS Filters team will reply within one business day.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="absolute left-[-10000px] h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="company-website">Company website</label>
                  <input id="company-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setField('website', event.target.value)} />
                </div>
                <div>
                  <label htmlFor="quote-name" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Name</label>
                  <input id="quote-name" name="name" autoComplete="name" required value={form.name} onChange={(event) => setField('name', event.target.value)} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="quote-company" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Company</label>
                  <input id="quote-company" name="company" autoComplete="organization" value={form.company} onChange={(event) => setField('company', event.target.value)} className={FIELD_CLASS} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="quote-email" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Email</label>
                    <input id="quote-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => setField('email', event.target.value)} className={FIELD_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="quote-phone" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Phone</label>
                    <input id="quote-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => setField('phone', event.target.value)} className={FIELD_CLASS} />
                  </div>
                </div>
                <div>
                  <label htmlFor="quote-booth" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Booth make / model</label>
                  <input id="quote-booth" name="booth" required value={form.booth} onChange={(event) => setField('booth', event.target.value)} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="quote-filters" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Filter needs</label>
                  <input id="quote-filters" name="filterNeeds" required value={form.filterNeeds} onChange={(event) => setField('filterNeeds', event.target.value)} className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="quote-message" className="mb-1 block text-sm font-medium uppercase tracking-[0.12em] text-[#e8e8e8]">Message</label>
                  <textarea id="quote-message" name="message" required rows={5} value={form.message} onChange={(event) => setField('message', event.target.value)} className={`${FIELD_CLASS} min-h-32 py-3`} />
                </div>
                {error && <p role="alert" className="text-base text-[#ffb4b4]">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-11 items-center rounded-lg bg-[#0066cc] px-6 text-base font-semibold text-white hover:bg-[#0057a3] disabled:opacity-70">
                  {status === 'sending' ? 'Sending…' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
