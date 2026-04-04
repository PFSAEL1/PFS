import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string || 'https://placeholder.supabase.co';
// Use VITE_SUPABASE_ANON_KEY (legacy anon key) — required for RLS policies to work correctly.
// The newer VITE_SUPABASE_PUBLISHABLE_KEY does NOT satisfy RLS row-level security checks.
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string || 'placeholder-key';

// Supabase client — requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars
// In production (Vercel), set these in the Vercel dashboard under Environment Variables
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL;
