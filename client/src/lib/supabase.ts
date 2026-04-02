import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string || 'https://reiuenraycfonsrdrjgg.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string || 'sb_publishable_A16fipTKq8BjVAeaEiR2ow_ugqOUNS6';

// Supabase client — credentials embedded for iOS app build
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const isSupabaseConfigured = true;
