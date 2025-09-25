import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  Ship
} from 'lucide-react';

const Navbar = () => {
  const { profile, signOut, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: Settings }] : []),
  ];

  if (!isAuthenticated) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-maersk-navy to-maersk-blue flex items-center justify-center">
                <Ship className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bai font-semibold heading-maersk">
              Maersk Quiz
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-neon-cyan glow-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-cosmic-surface/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 rounded-lg border border-neon-cyan/20"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink p-0.5">
                <div className="w-full h-full rounded-full bg-cosmic-surface flex items-center justify-center">
                  <User className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>
              <div className="text-sm">
                <p className="text-text-primary font-medium">{profile?.display_name}</p>
                <p className="text-text-secondary">{profile?.user_id}</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-cosmic-border hover:border-neon-cyan/50 hover:bg-cosmic-surface/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;