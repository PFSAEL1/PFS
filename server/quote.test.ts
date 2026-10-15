import { afterEach, describe, expect, it, vi } from 'vitest';
import { PFS_FILTERS_ORG_DOMAIN, PFS_FILTERS_ORG_ID, submitQuoteLead, validateQuote } from '../api/quote';

const env = {
  ZOHO_CLIENT_ID: 'client',
  ZOHO_CLIENT_SECRET: 'secret',
  ZOHO_REFRESH_TOKEN: 'refresh',
  ZOHO_API_DOMAIN: 'https://www.zohoapis.com',
  ZOHO_ACCOUNTS_DOMAIN: 'https://accounts.zoho.com',
};

function quote(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Ada Shop',
    company: 'North Bay Body',
    email: 'ada@example.com',
    phone: '707-555-0101',
    booth: 'Global Finishing Solutions Titan',
    filterNeeds: '20x20 ceiling blankets and exhaust pads',
    message: 'Need a quote for a downdraft booth.',
    startedAt: 1_000,
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('quote lead validation', () => {
  it('rejects an invalid email and accepts a complete request', () => {
    expect(validateQuote(quote({ email: 'not-an-email' }), 5_000)).toEqual({
      ok: false,
      error: 'Enter a valid email address.',
    });
    const valid = validateQuote(quote(), 5_000);
    expect(valid.ok).toBe(true);
  });

  it('drops honeypot submissions before they can create a lead', async () => {
    const fetchImpl = vi.fn();
    const result = await submitQuoteLead(quote({ website: 'https://spam.example' }), env, fetchImpl as unknown as typeof fetch, 5_000);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('creates a lead only after the token org is PFS Filters', async () => {
    const fetchImpl = vi.fn(async (url: string) => {
      if (String(url).includes('/oauth/v2/token')) {
        return new Response(JSON.stringify({ access_token: 'token' }), { status: 200 });
      }
      if (String(url).endsWith('/crm/v2/org')) {
        return new Response(JSON.stringify({ org: [{ id: PFS_FILTERS_ORG_ID, domain_name: PFS_FILTERS_ORG_DOMAIN, company_name: 'PFS Filters' }] }), { status: 200 });
      }
      return new Response(JSON.stringify({ data: [{ status: 'success' }] }), { status: 201 });
    });

    const result = await submitQuoteLead(quote(), env, fetchImpl as unknown as typeof fetch, 5_000);
    expect(result.status).toBe(200);
    const leadCall = fetchImpl.mock.calls.find((call) => String(call[0]).endsWith('/crm/v2/Leads'));
    expect(leadCall).toBeTruthy();
    const body = JSON.parse(String((leadCall?.[1] as RequestInit).body));
    expect(body.data[0].Email).toBe('ada@example.com');
    expect(body.data[0].Last_Name).toBe('Shop');
    expect(body.data[0].Description).toContain('Global Finishing Solutions Titan');
    expect(JSON.stringify(leadCall)).not.toContain('secret');
  });

  it('refuses to write a lead when the token belongs to another org', async () => {
    const fetchImpl = vi.fn(async (url: string) => {
      if (String(url).includes('/oauth/v2/token')) {
        return new Response(JSON.stringify({ access_token: 'token' }), { status: 200 });
      }
      return new Response(JSON.stringify({ org: [{ id: '892421522', domain_name: 'platinum', company_name: 'Platinum Finishing Systems' }] }), { status: 200 });
    });
    const result = await submitQuoteLead(quote(), env, fetchImpl as unknown as typeof fetch, 5_000);
    expect(result.status).toBe(503);
    expect(fetchImpl.mock.calls.some((call) => String(call[0]).includes('/Leads'))).toBe(false);
  });
});
