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
  User,
  Zap, 
  ArrowLeft,
  Github,
  Chrome
} from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: "Welcome to Nebula Quiz!",
        description: "Your cosmic journey begins now.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again with different credentials.",
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
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-pink/40 rounded-full"
            animate={{
              x: [0, -50, 0],
              y: [0, 80, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              right: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
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

        {/* Register Card */}
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-pink p-0.5">
              <div className="w-full h-full bg-cosmic-void rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-neon-cyan" />
              </div>
            </div>
            <h1 className="text-3xl font-bai font-bold heading-cosmic mb-2">
              Join the Cosmos
            </h1>
            <p className="text-text-secondary">
              Create your account and start your learning adventure
            </p>
          </div>

          {/* Social Registration */}
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
                Or create with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-text-primary font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Cosmic Explorer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-cosmic-surface/50 border-cosmic-border focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-text-primary font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12 bg-cosmic-surface/50 border-cosmic-border focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                  required
                />
              </div>
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
                'Create Account'
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neon-cyan hover:text-neon-pink transition-colors duration-300 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;