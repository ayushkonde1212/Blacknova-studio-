
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box, Loader2, ArrowRight, Github } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AuthPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/portal');
    }
  }, [user, isUserLoading, router]);

  async function handleEmailAuth(e: React.FormEvent<HTMLFormElement>, mode: 'login' | 'signup') {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Account Created", description: "Welcome to BlackNova Studio." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Authentication Failed", 
        description: error.message 
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Google Login Failed", 
        description: error.message 
      });
    }
  }

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 matte-gradient">
      <div className="flex items-center gap-2 mb-12 animate-fade-in">
        <span className="font-headline font-bold text-2xl tracking-tighter">BLACKNOVA</span>
        <span className="font-headline font-extralight text-2xl tracking-tighter text-secondary-foreground">STUDIO</span>
      </div>

      <Card className="w-full max-w-md bg-card border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="p-8 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Client Portal</CardTitle>
          <CardDescription className="text-secondary-foreground font-light mt-2">
            Securely manage your high-performance ventures.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 rounded-full p-1 h-12">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-background transition-all uppercase text-[10px] font-bold tracking-widest">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-background transition-all uppercase text-[10px] font-bold tracking-widest">Join</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={(e) => handleEmailAuth(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-muted-foreground">Email Address</Label>
                  <Input name="email" type="email" required className="bg-background border-white/10 rounded-2xl h-12" placeholder="alex@sterling.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-muted-foreground">Password</Label>
                  <Input name="password" type="password" required className="bg-background border-white/10 rounded-2xl h-12" />
                </div>
                <Button disabled={isLoading} className="w-full bg-primary text-primary-foreground h-12 rounded-full font-bold mt-4">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter Studio"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleEmailAuth(e, 'signup')} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-muted-foreground">Email Address</Label>
                  <Input name="email" type="email" required className="bg-background border-white/10 rounded-2xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-muted-foreground">Password</Label>
                  <Input name="password" type="password" required className="bg-background border-white/10 rounded-2xl h-12" />
                </div>
                <Button disabled={isLoading} className="w-full bg-primary text-primary-foreground h-12 rounded-full font-bold mt-4">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-bold">
              <span className="bg-card px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleLogin} 
            className="w-full h-12 rounded-full border-white/10 hover:bg-white/5 font-bold transition-all"
          >
            <Box className="mr-2 h-4 w-4 text-primary" />
            Google
          </Button>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold opacity-40">
        BlackNova Encryption Protocol v4.0
      </p>
    </div>
  );
}
