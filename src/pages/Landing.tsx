import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Ship, 
  Brain, 
  Trophy, 
  Users, 
  ArrowRight,
  Star,
  Target,
  BarChart3,
  Globe
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered quiz system that adapts to your progress and learning style'
    },
    {
      icon: Trophy,
      title: 'Achievement Tracking',
      description: 'Earn badges and track your progress with comprehensive analytics'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Get insights into your performance with detailed reports and trends'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Create teams, share quizzes, and compete with colleagues'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-maersk-navy via-maersk-blue to-maersk-light-blue" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003e62' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-maersk-blue/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
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
            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-r from-maersk-navy to-maersk-blue p-0.5"
          >
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <Ship className="w-12 h-12 text-maersk-navy" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bai font-bold mb-6 heading-maersk"
          >
            Maersk Quiz
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Elevate your team's knowledge with our professional quiz platform. 
            Create engaging assessments, track progress, and drive learning excellence 
            across your organization.
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
                className="maersk-button text-white font-semibold px-8 py-6 text-lg rounded-xl"
              >
                <Star className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-maersk-blue/50 text-maersk-blue hover:bg-maersk-blue/5 px-8 py-6 text-lg rounded-xl"
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
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-maersk-blue/10 to-maersk-light-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-maersk-blue" />
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
            <Globe className="w-16 h-16 mx-auto mb-6 text-maersk-blue" />
            <h2 className="text-4xl font-bai font-bold mb-4 heading-maersk">
              Ready to Transform Learning?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join organizations worldwide who trust our platform to deliver 
              exceptional learning experiences and drive measurable results.
            </p>
            <Link to="/register">
              <Button 
                size="lg" 
                className="maersk-button text-white font-semibold px-10 py-6 text-lg rounded-xl"
              >
                <Ship className="w-5 h-5 mr-2" />
                Start Your Journey Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;