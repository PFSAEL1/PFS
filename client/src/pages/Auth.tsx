import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_e33888bf.png';

// Synchronous mobile detection - runs before first render
const IS_MOBILE = typeof window !== 'undefined' && (
  window.innerWidth < 768 ||
  /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
);

// Desktop-only particle background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function Auth() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Desktop cinematic intro state - mobile skips entirely
  const [animState, setAnimState] = useState<'intro' | 'shrinking' | 'done'>(
    IS_MOBILE ? 'done' : 'intro'
  );

  // Invite/recovery flow state
  const [isInviteFlow, setIsInviteFlow] = useState(false);
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Desktop animation timing
  useEffect(() => {
    if (IS_MOBILE) return;
    const t1 = setTimeout(() => setAnimState('shrinking'), 2000);
    const t2 = setTimeout(() => setAnimState('done'), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <img
                src={LOGO_URL}
                alt="PFS Filters"
                className="h-14 object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
              />
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
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <img
                src={LOGO_URL}
                alt="PFS Filters"
                className="h-14 object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
              />
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

  // ═══════════════════════════════════════════════════════════════
  // MOBILE: Same look as desktop (large logo, spacious card) but NO animations
  // ═══════════════════════════════════════════════════════════════
  if (IS_MOBILE) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden px-4">
        <SEO
          title="Sign In - PFS Filters Account"
          description="Sign in to your PFS Filters account to manage orders, track memberships, and access exclusive discounts."
          canonical="https://pfsfilters.com/auth"
          noIndex
        />

        {/* Static logo above the card - same position as desktop after animation */}
        <div className="absolute left-0 right-0 flex justify-center" style={{ top: 'calc(50% - 220px)' }}>
          <img
            src={LOGO_URL}
            alt="PFS Filters"
            style={{
              width: '250px',
              filter: 'brightness(1.8) drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Card with form - matches desktop layout */}
        <div className="relative z-10 w-full max-w-sm mt-8">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl">
            {/* Spacer for the logo above */}
            <div className="flex justify-center mb-6" style={{ height: '80px' }} />

            <p className="text-white/70 text-sm text-center mb-4">
              {activeTab === 'signin' ? 'Sign in to your account' : 'Create your PFS Filters account'}
            </p>

            {/* Sign In Form */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email" className="text-white text-sm font-medium">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    inputMode="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-white text-sm font-medium">Password</Label>
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-xs text-white/60 active:text-white"
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
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-bold active:bg-white/80 h-12 text-base"
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
                  <Label htmlFor="signup-name" className="text-white text-sm font-medium">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-white text-sm font-medium">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    inputMode="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-white text-sm font-medium">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData((p) => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-confirm" className="text-white text-sm font-medium">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData((p) => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="bg-black border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 text-[16px] h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-bold active:bg-white/80 h-12 text-base"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
                </Button>
              </form>
            )}

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-white/60 active:text-white"
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

  // ═══════════════════════════════════════════════════════════════
  // DESKTOP: Full cinematic intro with particles and animations
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <SEO
        title="Sign In - PFS Filters Account"
        description="Sign in to your PFS Filters account to manage orders, track memberships, and access exclusive discounts."
        canonical="https://pfsfilters.com/auth"
        noIndex
      />
      <ParticleBackground />

      {/* CSS Animations */}
      <style>{`
        @keyframes breathingGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 80px rgba(59, 130, 246, 0.2));
          }
          50% { 
            filter: drop-shadow(0 0 70px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 140px rgba(59, 130, 246, 0.4));
          }
        }
        @keyframes logoAppear {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cardReveal {
          0% { opacity: 0; transform: translateY(30px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes formFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .logo-breathing {
          animation: breathingGlow 2.5s ease-in-out infinite, logoAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .card-reveal {
          animation: cardReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .form-fade-in {
          animation: formFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Animated logo */}
      <div
        className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
        style={{
          transition: animState !== 'intro' 
            ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' 
            : 'none',
          transform: animState === 'intro' 
            ? 'translateY(0)' 
            : 'translateY(-168px)',
        }}
      >
        <img
          src={LOGO_URL}
          alt="PFS Filters"
          className={animState === 'intro' ? 'logo-breathing' : ''}
          style={{
            width: animState === 'intro' ? '340px' : '250px',
            transition: animState !== 'intro'
              ? 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease-out'
              : 'none',
            filter: animState !== 'intro' 
              ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' 
              : undefined,
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Card with form */}
      <div
        className={`relative z-10 w-full max-w-sm mx-4 ${
          animState !== 'intro' ? 'card-reveal' : ''
        }`}
        style={{
          opacity: animState === 'intro' ? 0 : undefined,
          visibility: animState === 'intro' ? 'hidden' : 'visible',
        }}
      >
        <div className="bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Spacer for the logo that moves into this position */}
          <div className="flex justify-center mb-6" style={{ height: '110px' }} />

          {/* Form content with staggered fade-in */}
          <div className={animState !== 'intro' ? 'form-fade-in' : ''} style={{ opacity: animState === 'intro' ? 0 : undefined }}>
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
                    value={signInData.email}
                    onChange={(e) => setSignInData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-white/70 text-sm">Password</Label>
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-xs text-white/40 hover:text-white/70 transition-colors"
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
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
                </Button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name" className="text-white/70 text-sm">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-white/70 text-sm">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
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
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
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
                    className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
                </Button>
              </form>
            )}

            {/* Toggle between sign in and sign up */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {activeTab === 'signin'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
