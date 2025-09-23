import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Zap, 
  ArrowLeft,
  Github,
  Chrome
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to Nebula Quiz.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialButtons = [
    { icon: Chrome, label: 'Google', color: 'from-red-500 to-orange-500' },
    { icon: Github, label: 'GitHub', color: 'from-gray-700 to-gray-900' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-text-secondary hover:text-text-primary mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink p-0.5">
              <div className="w-full h-full bg-cosmic-void rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-neon-cyan" />
              </div>
            </div>
            <h1 className="text-3xl font-bai font-bold heading-cosmic mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to continue your cosmic learning journey
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            {socialButtons.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.label}
                  variant="outline"
                  className="w-full h-12 border-cosmic-border hover:border-neon-cyan/50 hover:bg-cosmic-surface/50 transition-all duration-300"
                  disabled
                >
                  <div className={`w-5 h-5 mr-3 rounded bg-gradient-to-r ${social.color} p-0.5`}>
                    <div className="w-full h-full bg-cosmic-void rounded flex items-center justify-center">
                      <Icon className="w-3 h-3 text-text-primary" />
                    </div>
                  </div>
                  Continue with {social.label}
                </Button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cosmic-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-cosmic-surface px-4 text-text-secondary">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-primary font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="cosmic@nebula.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-cosmic-surface/50 border-cosmic-border focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-text-primary font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-cosmic-surface/50 border-cosmic-border focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-neon-cyan hover:text-neon-pink transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 neon-button text-cosmic-void font-semibold text-lg rounded-xl"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-cosmic-void/30 border-t-cosmic-void rounded-full"
                />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-neon-cyan hover:text-neon-pink transition-colors duration-300 font-medium"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 p-4 glass-card"
        >
          <p className="text-text-secondary text-sm text-center mb-2">
            Demo Credentials:
          </p>
          <div className="text-xs text-text-secondary space-y-1">
            <p><strong>User:</strong> user@nebula.com / password123</p>
            <p><strong>Admin:</strong> admin@nebula.com / admin123</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;