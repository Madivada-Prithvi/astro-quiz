import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Brain, 
  Trophy, 
  Users, 
  ArrowRight,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'Adaptive Learning',
      description: 'AI-powered difficulty adjustment that evolves with your skill level'
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Unlock cosmic badges and climb the leaderboards'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into your learning patterns and progress'
    },
    {
      icon: Users,
      title: 'Collaborative Quizzes',
      description: 'Challenge friends and compete in real-time battles'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-20" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-neon-cyan' : i % 3 === 1 ? 'bg-neon-pink' : 'bg-neon-purple'
            }/30`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-pink p-0.5"
          >
            <div className="w-full h-full bg-cosmic-void rounded-2xl flex items-center justify-center">
              <Zap className="w-12 h-12 text-neon-cyan" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bai font-bold mb-6 heading-cosmic"
          >
            Nebula Quiz
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of learning with immersive quizzes, 
            advanced analytics, and AI-powered personalization in a 
            stunning cosmic interface.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register">
              <Button 
                size="lg" 
                className="neon-button text-cosmic-void font-semibold px-8 py-6 text-lg rounded-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 px-8 py-6 text-lg rounded-xl"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="glass-card p-6 text-center group hover:glow-sm transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <h3 className="text-lg font-bai font-semibold mb-2 text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 max-w-4xl mx-auto"
          >
            <Target className="w-16 h-16 mx-auto mb-6 text-neon-pink" />
            <h2 className="text-4xl font-bai font-bold mb-4 heading-cosmic">
              Ready to Elevate Your Learning?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their knowledge 
              with our futuristic quiz platform.
            </p>
            <Link to="/register">
              <Button 
                size="lg" 
                className="neon-button text-cosmic-void font-semibold px-10 py-6 text-lg rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Begin Your Cosmic Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;