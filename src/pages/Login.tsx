import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function Login() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState<'student' | 'admin'>('student');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(role);
        navigate(role === 'admin' ? '/admin' : '/student');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_70%)]" />
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px]" />

            <Card className="w-full max-w-md backdrop-blur-md bg-card/40 border-border shadow-xl z-10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-cyan-500/20">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access the platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="student@school.edu" required className="bg-background/20" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required className="bg-background/20" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${role === 'student' ? 'border-cyan-500 bg-cyan-500/10' : 'border-border bg-background/20 opacity-50'}`}
                                onClick={() => setRole('student')}
                            >
                                <p className="text-sm font-semibold text-center">Student</p>
                            </div>
                            <div
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${role === 'admin' ? 'border-purple-500 bg-purple-500/10' : 'border-border bg-background/20 opacity-50'}`}
                                onClick={() => setRole('admin')}
                            >
                                <p className="text-sm font-semibold text-center">Administrator</p>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-opacity" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-xs text-muted-foreground">Don't have an account? <span className="text-cyan-400 cursor-pointer hover:underline">Register now</span></p>
                </CardFooter>
            </Card>
        </div>
    );
}
