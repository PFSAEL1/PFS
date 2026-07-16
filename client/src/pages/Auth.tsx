import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Filter, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Auth() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', name: '' });

  // Invite/recovery flow state
  const [isInviteFlow, setIsInviteFlow] = useState(false);
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Check URL hash for auth tokens (Supabase redirects with hash fragments)
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

    // Also listen for auth state changes (Supabase auto-detects tokens in URL)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryFlow(true);
        setCheckingSession(false);
      } else if (event === 'SIGNED_IN' && session) {
        // Check if this is from an invite link (user has no password set yet)
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

    // Fallback: stop checking after a short delay
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
      // Clear the hash from the URL
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
      // Check admin role and redirect accordingly
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
      // If auto-confirm is enabled, the session will be returned immediately
      if (data.session) {
        toast.success('Account created! Welcome to PFS Filters.');
        navigate('/dashboard');
      } else {
        // Fallback: try signing in immediately (auto-confirm should make this work)
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

  // Show loading state while checking for auth tokens
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#040404] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  // Show Set Password form for invite or recovery flow
  if (isInviteFlow || isRecoveryFlow) {
    return (
      <div className="min-h-screen bg-[#040404] text-white">
        <SEO
          title="Set Your Password - PFS Filters"
          description="Set your password to access your PFS Filters account."
          canonical="https://pfsfilters.com/auth"
          noIndex
        />
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Filter className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">PFS Filters</span>
              </div>
              <p className="text-white/70">
                {isInviteFlow
                  ? "Welcome! Set your password to get started."
                  : "Set your new password below."}
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {passwordSet ? 'Password Set!' : isInviteFlow ? 'Create Your Password' : 'Reset Password'}
                </CardTitle>
                <CardDescription className="text-center">
                  {passwordSet
                    ? 'Your password has been set. Redirecting to your dashboard...'
                    : 'Choose a secure password for your account.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {passwordSet ? (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                    <p className="text-white/70 text-sm">Redirecting...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSetPassword} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirm-new-password">Confirm Password</Label>
                      <Input
                        id="confirm-new-password"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-500 text-white hover:bg-blue-500/90"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Set Password'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Sign In - PFS Filters Account"
        description="Sign in to your PFS Filters account to manage orders, track memberships, and access exclusive discounts."
        canonical="https://pfsfilters.com/auth"
        noIndex
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-32 pb-16 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Filter className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">PFS Filters</span>
            </div>
            <p className="text-white/70">Sign in to your account or create a new one</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="signin">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="signin" className="flex-1">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="flex-1">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" type="email" value={signInData.email} onChange={(e) => setSignInData((p) => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input id="signin-password" type="password" value={signInData.password} onChange={(e) => setSignInData((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input id="signup-name" value={signUpData.name} onChange={(e) => setSignUpData((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" value={signUpData.email} onChange={(e) => setSignUpData((p) => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" value={signUpData.password} onChange={(e) => setSignUpData((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input id="signup-confirm" type="password" value={signUpData.confirmPassword} onChange={(e) => setSignUpData((p) => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
