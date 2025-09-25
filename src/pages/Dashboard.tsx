import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Play, 
  Trophy, 
  Brain, 
  Clock, 
  Target,
  Zap,
  Star,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();

  const mockQuizzes = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JS basics',
      difficulty: 'Beginner',
      questions: 15,
      timeLimit: 20,
      category: 'Programming',
      completed: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2', 
      title: 'React Advanced Patterns',
      description: 'Master advanced React concepts',
      difficulty: 'Advanced',
      questions: 25,
      timeLimit: 35,
      category: 'Frontend',
      completed: true,
      score: 92,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      description: 'Algorithm complexity and optimization',
      difficulty: 'Expert',
      questions: 30,
      timeLimit: 45,
      category: 'Computer Science',
      completed: false,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    { icon: Trophy, title: 'First Victory', description: 'Complete your first quiz', unlocked: true },
    { icon: Target, title: 'Perfectionist', description: 'Score 100% on any quiz', unlocked: false },
    { icon: Zap, title: 'Speed Demon', description: 'Complete a quiz in under 5 minutes', unlocked: true },
    { icon: Brain, title: 'Knowledge Seeker', description: 'Complete 10 quizzes', unlocked: false },
  ];

  const stats = [
    { label: 'Quizzes Completed', value: '12', icon: Trophy, change: '+3 this week' },
    { label: 'Average Score', value: '87%', icon: Target, change: '+5% improvement' },
    { label: 'Time Saved', value: '2.4h', icon: Clock, change: 'vs manual study' },
    { label: 'Streak Days', value: '7', icon: Star, change: 'Personal best!' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bai font-bold heading-cosmic mb-2">
                  Welcome back, {profile?.display_name}! 🚀
                </h1>
                <p className="text-text-secondary text-lg">
                  Ready to expand your cosmic knowledge today?
                </p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="glass-card border-glass-border/50 hover:glow-sm transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-text-secondary text-sm font-medium">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-text-primary mt-1">
                              {stat.value}
                            </p>
                            <p className="text-xs text-neon-cyan mt-1">
                              {stat.change}
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-neon-cyan" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Available Quizzes */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bai font-semibold text-text-primary">
                    Available Quizzes
                  </h2>
                  <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockQuizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    >
                      <Card className="glass-card border-glass-border/50 hover:glow-sm transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${quiz.color}`} />
                                <h3 className="text-xl font-bai font-semibold text-text-primary">
                                  {quiz.title}
                                </h3>
                                {quiz.completed && (
                                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                                    Completed • {quiz.score}%
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-text-secondary mb-4">
                                {quiz.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                                <div className="flex items-center gap-1">
                                  <Brain className="w-4 h-4" />
                                  <span>{quiz.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="w-4 h-4" />
                                  <span>{quiz.questions} questions</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{quiz.timeLimit} minutes</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="ml-6">
                              <Link to={`/quiz/${quiz.id}`}>
                                <Button 
                                  className={`neon-button text-cosmic-void font-semibold ${
                                    quiz.completed ? 'opacity-75' : ''
                                  }`}
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  {quiz.completed ? 'Retake' : 'Start'}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Achievements Sidebar */}
            <div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bai font-semibold text-text-primary mb-6">
                  Achievements
                </h2>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      >
                        <Card className={`glass-card border-glass-border/50 transition-all duration-300 ${
                          achievement.unlocked ? 'glow-sm' : 'opacity-60'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                achievement.unlocked 
                                  ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20' 
                                  : 'bg-cosmic-border/20'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  achievement.unlocked ? 'text-neon-cyan' : 'text-text-secondary'
                                }`} />
                              </div>
                              <div>
                                <h3 className="font-bai font-medium text-text-primary">
                                  {achievement.title}
                                </h3>
                                <p className="text-xs text-text-secondary">
                                  {achievement.description}
                                </p>
                              </div>
                              {achievement.unlocked && (
                                <Award className="w-4 h-4 text-neon-cyan ml-auto" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-8"
                >
                  <Card className="glass-card border-glass-border/50">
                    <CardHeader>
                      <CardTitle className="text-text-primary font-bai">
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link to="/analytics">
                        <Button 
                          variant="outline" 
                          className="w-full border-cosmic-border hover:border-neon-cyan/50 hover:bg-cosmic-surface/50"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View Analytics
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-cosmic-border hover:border-neon-cyan/50 hover:bg-cosmic-surface/50"
                        disabled
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Practice Mode
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;