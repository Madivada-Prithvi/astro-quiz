import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Trophy, 
  Brain,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const Analytics = () => {
  // Mock data for charts and analytics
  const stats = [
    { label: 'Total Quizzes', value: '24', change: '+3 this week', icon: Trophy },
    { label: 'Average Score', value: '87.5%', change: '+2.3% vs last month', icon: Target },
    { label: 'Study Time', value: '12.4h', change: 'This month', icon: Clock },
    { label: 'Knowledge Areas', value: '8', change: '3 mastered', icon: Brain },
  ];

  const recentQuizzes = [
    { title: 'JavaScript Fundamentals', score: 92, date: '2024-01-15', category: 'Programming' },
    { title: 'React Advanced Patterns', score: 88, date: '2024-01-14', category: 'Frontend' },
    { title: 'Node.js Basics', score: 95, date: '2024-01-12', category: 'Backend' },
    { title: 'CSS Grid & Flexbox', score: 82, date: '2024-01-10', category: 'Styling' },
  ];

  const knowledgeAreas = [
    { area: 'JavaScript', mastery: 92, progress: 'Excellent' },
    { area: 'React', mastery: 88, progress: 'Very Good' },
    { area: 'Node.js', mastery: 76, progress: 'Good' },
    { area: 'CSS', mastery: 84, progress: 'Very Good' },
    { area: 'Python', mastery: 62, progress: 'Developing' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bai font-bold heading-cosmic mb-2">
                  Learning Analytics
                </h1>
                <p className="text-text-secondary text-lg">
                  Track your progress and identify areas for improvement
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-cosmic-border hover:border-neon-cyan/50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="neon-button text-cosmic-void font-semibold">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>

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
                          <p className="text-3xl font-bold text-text-primary mt-1">
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Performance Chart Placeholder */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="glass-card border-glass-border/50">
                <CardHeader>
                  <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Trend
                  </CardTitle>
                  <CardDescription className="text-text-secondary">
                    Your quiz scores over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-cosmic-surface/30 rounded-lg flex items-center justify-center border border-cosmic-border/50">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-neon-cyan/50 mx-auto mb-4" />
                      <p className="text-text-secondary">Interactive Chart Placeholder</p>
                      <p className="text-sm text-text-secondary/70 mt-2">
                        Chart.js integration for real-time analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Knowledge Areas */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="glass-card border-glass-border/50">
                <CardHeader>
                  <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Knowledge Mastery
                  </CardTitle>
                  <CardDescription className="text-text-secondary">
                    Your proficiency across different topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {knowledgeAreas.map((area, index) => (
                    <motion.div
                      key={area.area}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">{area.area}</span>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${area.mastery >= 90 ? 'border-neon-cyan text-neon-cyan' : 
                              area.mastery >= 80 ? 'border-success text-success' :
                              area.mastery >= 70 ? 'border-warning text-warning' :
                              'border-destructive text-destructive'}
                          `}
                        >
                          {area.progress}
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-cosmic-border rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              area.mastery >= 90 ? 'bg-gradient-to-r from-neon-cyan to-neon-purple' :
                              area.mastery >= 80 ? 'bg-gradient-to-r from-green-400 to-blue-500' :
                              area.mastery >= 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                              'bg-gradient-to-r from-red-400 to-pink-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${area.mastery}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                          />
                        </div>
                        <span className="absolute right-0 -top-6 text-sm text-text-secondary">
                          {area.mastery}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Quiz Activity
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Your latest quiz attempts and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-cosmic-border hover:border-neon-cyan/30 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-neon-cyan" />
                        </div>
                        <div>
                          <h3 className="text-text-primary font-medium">{quiz.title}</h3>
                          <p className="text-text-secondary text-sm">{quiz.category} • {quiz.date}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          quiz.score >= 90 ? 'text-neon-cyan' :
                          quiz.score >= 80 ? 'text-success' :
                          quiz.score >= 70 ? 'text-warning' :
                          'text-destructive'
                        }`}>
                          {quiz.score}%
                        </div>
                        <p className="text-text-secondary text-sm">Score</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;