import { useState } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Auth() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', name: '' });

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

  return (
    <div className="min-h-screen bg-[#080808] text-white">
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
