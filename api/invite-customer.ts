import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ADMIN_EMAIL = 'isaac@pfsspraybooths.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the request is from an authenticated admin
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  // Create a Supabase client with the anon key to verify the caller's session
  const supabaseAnon = createClient(
    SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  // Verify the caller is authenticated and is admin
  const { data: { user: caller }, error: authError } = await supabaseAnon.auth.getUser(token);
  if (authError || !caller) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  // Check if caller is admin (by email or user_roles table)
  if (caller.email !== ADMIN_EMAIL) {
    // Also check user_roles table
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', caller.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      return res.status(403).json({ error: 'Forbidden: admin access required' });
    }
  }

  // Get the email to invite from the request body
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Create Supabase admin client with service role key
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // First check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      // User already exists — send a password reset email instead
      const { error: resetError } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://www.pfsfilters.com/auth',
      });

      if (resetError) {
        console.error('Password reset error:', resetError);
        return res.status(200).json({
          success: true,
          message: 'User already exists. Password reset email may have been sent.',
          alreadyExists: true,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User already exists. Password reset email sent.',
        alreadyExists: true,
      });
    }

    // Invite new user by email
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: 'https://www.pfsfilters.com/auth',
    });

    if (error) {
      console.error('Invite error:', error);
      // If user already exists error, still return success
      if (error.message?.includes('already') || error.message?.includes('exists')) {
        return res.status(200).json({
          success: true,
          message: 'User already has an account.',
          alreadyExists: true,
        });
      }
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `Invite email sent to ${email}`,
      userId: data?.user?.id,
    });
  } catch (err: unknown) {
    console.error('Invite handler error:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal server error',
    });
  }
}
