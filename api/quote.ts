import type { VercelRequest, VercelResponse } from '@vercel/node';

// Quote leads are created only in the PFS Filters Zoho CRM org.
// Required Vercel env vars (never commit values):
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_DOMAIN
// Optional: ZOHO_ACCOUNTS_DOMAIN (defaults to https://accounts.zoho.com)
export const PFS_FILTERS_ORG_ID = '920505233';
export const PFS_FILTERS_ORG_DOMAIN = 'pfsfilters';
const BLOCKED_ORG_IDS = new Set(['892421522']);

export type QuotePayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  booth?: unknown;
  filterNeeds?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

export type QuoteEnv = {
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_API_DOMAIN?: string;
  ZOHO_ACCOUNTS_DOMAIN?: string;
};

type NormalizedQuote = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  booth: string;
  filterNeeds: string;
  message: string;
};

type SubmitResult = {
  status: number;
  body: { ok: boolean; error?: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 1500;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function text(value: unknown, max: number): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function validateQuote(input: QuotePayload, now = Date.now()): { ok: true; ignored?: boolean; value?: NormalizedQuote } | { ok: false; error: string } {
  if (text(input.website, 200)) return { ok: true, ignored: true };

  const startedAt = Number(input.startedAt);
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || now - startedAt > MAX_AGE_MS) {
    return { ok: false, error: 'Please take a moment and send the form again.' };
  }

  const name = text(input.name, 120);
  const email = text(input.email, 100);
  const booth = text(input.booth, 160);
  const filterNeeds = text(input.filterNeeds, 500);
  const message = text(input.message, 2000);
  const phone = text(input.phone, 40);
  const company = text(input.company, 200);

  if (name.length < 2) return { ok: false, error: 'Enter your name.' };
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: 'Enter a valid email address.' };
  if (phone && phone.replace(/\D/g, '').length < 7) return { ok: false, error: 'Enter a valid phone number or leave it blank.' };
  if (booth.length < 2) return { ok: false, error: 'Enter the booth make and model.' };
  if (filterNeeds.length < 2) return { ok: false, error: 'Describe the filters you need.' };
  if (message.length < 8) return { ok: false, error: 'Add a short message so we can help.' };

  const [firstName, ...rest] = name.split(' ');
  return {
    ok: true,
    value: {
      firstName,
      lastName: rest.join(' ') || firstName,
      company,
      email,
      phone,
      booth,
      filterNeeds,
      message,
    },
  };
}

function requiredEnv(env: QuoteEnv): QuoteEnv | null {
  if (!env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET || !env.ZOHO_REFRESH_TOKEN || !env.ZOHO_API_DOMAIN) return null;
  return env;
}

async function accessToken(env: QuoteEnv, fetchImpl: typeof fetch): Promise<string> {
  const accounts = (env.ZOHO_ACCOUNTS_DOMAIN || 'https://accounts.zoho.com').replace(/\/$/, '');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: env.ZOHO_CLIENT_ID || '',
    client_secret: env.ZOHO_CLIENT_SECRET || '',
    refresh_token: env.ZOHO_REFRESH_TOKEN || '',
  });
  const response = await fetchImpl(`${accounts}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) throw new Error('Zoho token refresh failed');
  const payload = await response.json() as { access_token?: string };
  if (!payload.access_token) throw new Error('Zoho token refresh failed');
  return payload.access_token;
}

function orgMatches(org: Record<string, unknown> | undefined): boolean {
  if (!org) return false;
  const id = String(org.id || org.zgid || '');
  const domain = String(org.domain_name || '').toLowerCase();
  if (BLOCKED_ORG_IDS.has(id)) return false;
  return id === PFS_FILTERS_ORG_ID || domain === PFS_FILTERS_ORG_DOMAIN;
}

export async function submitQuoteLead(
  input: QuotePayload,
  env: QuoteEnv,
  fetchImpl: typeof fetch = fetch,
  now = Date.now(),
): Promise<SubmitResult> {
  const validated = validateQuote(input, now);
  if (!validated.ok) return { status: 400, body: { ok: false, error: validated.error } };
  if (validated.ignored || !validated.value) return { status: 200, body: { ok: true } };

  const ready = requiredEnv(env);
  if (!ready) {
    return { status: 503, body: { ok: false, error: 'Quote requests are temporarily unavailable. Call us and we will help directly.' } };
  }

  const apiDomain = ready.ZOHO_API_DOMAIN!.replace(/\/$/, '');
  const token = await accessToken(ready, fetchImpl);
  const orgResponse = await fetchImpl(`${apiDomain}/crm/v2/org`, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
  });
  if (!orgResponse.ok) throw new Error('Zoho organization lookup failed');
  const orgPayload = await orgResponse.json() as { org?: Array<Record<string, unknown>> };
  if (!orgMatches(orgPayload.org?.[0])) {
    return { status: 503, body: { ok: false, error: 'Quote requests are temporarily unavailable. Call us and we will help directly.' } };
  }

  const quote = validated.value;
  const leadResponse = await fetchImpl(`${apiDomain}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [{
        First_Name: quote.firstName,
        Last_Name: quote.lastName,
        Company: quote.company,
        Email: quote.email,
        Phone: quote.phone,
        Lead_Source: 'Web Research',
        Description: `Booth make/model: ${quote.booth}\nFilter needs: ${quote.filterNeeds}\n\n${quote.message}`,
      }],
    }),
  });
  const leadPayload = await leadResponse.json().catch(() => null) as { data?: Array<{ status?: string }> } | null;
  const created = leadResponse.ok && leadPayload?.data?.[0]?.status === 'success';
  if (!created) {
    return { status: 502, body: { ok: false, error: 'We could not send your request. Please call us or try again.' } };
  }
  return { status: 200, body: { ok: true } };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }
  try {
    const result = await submitQuoteLead((req.body || {}) as QuotePayload, process.env);
    res.status(result.status).json(result.body);
  } catch {
    res.status(502).json({ ok: false, error: 'We could not send your request. Please call us or try again.' });
  }
}
