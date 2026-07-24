import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_e33888bf.png';

export default function Auth() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Invite/recovery flow state
  const [isInviteFlow, setIsInviteFlow] = useState(false);
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const type = params.get('type');
      const accessToken = params.get('access_token');

      if (accessToken && (type === 'invite' || type === 'signup')) {
        setIsInviteFlow(true);
        setCheckingSession(false);
        return;
      }
      if (accessToken && (type === 'recovery' || type === 'magiclink')) {
        setIsRecoveryFlow(true);
        setCheckingSession(false);
        return;
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryFlow(true);
        setCheckingSession(false);
      } else if (event === 'SIGNED_IN' && session) {
        const hash = window.location.hash;
        if (hash.includes('type=invite') || hash.includes('type=signup')) {
          setIsInviteFlow(true);
          setCheckingSession(false);
        } else {
          setCheckingSession(false);
        }
      } else {
        setCheckingSession(false);
      }
    });

    const timeout = setTimeout(() => setCheckingSession(false), 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordSet(true);
      toast.success('Password set successfully! Redirecting...');
      window.history.replaceState(null, '', '/auth');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });
      if (error) throw error;
      toast.success('Signed in successfully!');
      if (authData.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .eq('role', 'admin')
          .single();
        if (roleData) {
          navigate('/filter-database');
          return;
        }
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: { full_name: signUpData.name },
          emailRedirectTo: 'https://www.pfsfilters.com/dashboard',
        },
      });
      if (error) throw error;
      if (data.session) {
        toast.success('Account created! Welcome to PFS Filters.');
        navigate('/dashboard');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: signUpData.email,
          password: signUpData.password,
        });
        if (signInError) {
          toast.success('Account created! You can now sign in.');
        } else {
          toast.success('Account created! Welcome to PFS Filters.');
          navigate('/dashboard');
        }
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: 'https://www.pfsfilters.com/auth',
      });
      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox.');
      setForgotPassword(false);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  // Set Password form (invite/recovery)
  if (isInviteFlow || isRecoveryFlow) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
        <SEO
          title="Set Your Password - PFS Filters"
          description="Set your password to access your PFS Filters account."
          canonical="https://pfsfilters.com/auth"
          noIndex
        />
        <div className="w-full max-w-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-center mb-6">
              <img src={LOGO_URL} alt="PFS Filters" className="h-10 object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-white text-center mb-1">
              {passwordSet ? 'Password Set!' : isInviteFlow ? 'Create Your Password' : 'Reset Password'}
            </h2>
            <p className="text-white/50 text-sm text-center mb-6">
              {passwordSet
                ? 'Redirecting to your dashboard...'
                : isInviteFlow
                ? 'Welcome! Set a password to activate your account.'
                : 'Enter your new password below.'}
            </p>
            {passwordSet ? (
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
            ) : (
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-white/70 text-sm">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-new-password" className="text-white/70 text-sm">Confirm Password</Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-semibold hover:bg-white/90 h-12 text-base"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Set Password'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Forgot Password form
  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
        <SEO
          title="Reset Password - PFS Filters"
          description="Reset your PFS Filters account password."
          canonical="https://pfsfilters.com/auth"
          noIndex
        />
        <div className="w-full max-w-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-center mb-5">
              <img src={LOGO_URL} alt="PFS Filters" className="h-10 object-contain" />
            </div>
            <h2 className="text-lg font-semibold text-white text-center mb-1">Reset Password</h2>
            <p className="text-white/50 text-sm text-center mb-5">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reset-email" className="text-white/70 text-sm">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  inputMode="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold hover:bg-white/90 h-12 text-base"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="text-sm text-white/50 hover:text-white"
              >
                Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main auth form - clean, fast, no heavy animations
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      <SEO
        title="Sign In - PFS Filters Account"
        description="Sign in to your PFS Filters account to manage orders, track memberships, and access exclusive discounts."
        canonical="https://pfsfilters.com/auth"
        noIndex
      />
      <div className="w-full max-w-sm">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src={LOGO_URL}
              alt="PFS Filters"
              className="h-12 object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
            />
          </div>

          <p className="text-white/50 text-sm text-center mb-4">
            {activeTab === 'signin' ? 'Sign in to your account' : 'Create your PFS Filters account'}
          </p>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" className="text-white/70 text-sm">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  inputMode="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password" className="text-white/70 text-sm">Password</Label>
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-xs text-white/40 hover:text-white/70"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="signin-password"
                  type="password"
                  value={signInData.password}
                  onChange={(e) => setSignInData((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold hover:bg-white/90 h-12 text-base"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
              </Button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-white/70 text-sm">Full Name</Label>
                <Input
                  id="signup-name"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-email" className="text-white/70 text-sm">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  inputMode="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-white/70 text-sm">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm" className="text-white/70 text-sm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData((p) => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold hover:bg-white/90 h-12 text-base"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
              </Button>
            </form>
          )}

          {/* Toggle between sign in and sign up */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
              className="text-sm text-white/50 hover:text-white"
            >
              {activeTab === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
