import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  BookOpen, 
  BarChart3,
  Search,
  Filter,
  Settings,
  Eye,
  Play
} from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const adminStats = [
    { label: 'Total Users', value: '1,247', change: '+12 this week', icon: Users },
    { label: 'Active Quizzes', value: '23', change: '3 draft', icon: BookOpen },
    { label: 'Total Attempts', value: '5,431', change: '+89 today', icon: BarChart3 },
    { label: 'Average Score', value: '84.2%', change: '+2.1% this month', icon: BarChart3 },
  ];

  const mockQuizzes = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      category: 'Programming',
      questions: 15,
      attempts: 342,
      avgScore: 87.2,
      status: 'published',
      created: '2024-01-10',
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'React Advanced Patterns',
      category: 'Frontend',
      questions: 25,
      attempts: 156,
      avgScore: 78.9,
      status: 'published',
      created: '2024-01-08',
      difficulty: 'Advanced'
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      category: 'Computer Science',
      questions: 30,
      attempts: 89,
      avgScore: 72.4,
      status: 'draft',
      created: '2024-01-15',
      difficulty: 'Expert'
    }
  ];

  const filteredQuizzes = mockQuizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'border-success text-success';
      case 'draft': return 'border-warning text-warning';
      case 'archived': return 'border-destructive text-destructive';
      default: return 'border-cosmic-border text-text-secondary';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'border-neon-cyan text-neon-cyan';
      case 'Advanced': return 'border-neon-pink text-neon-pink';
      case 'Expert': return 'border-neon-purple text-neon-purple';
      default: return 'border-cosmic-border text-text-secondary';
    }
  };

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
                  Admin Dashboard
                </h1>
                <p className="text-text-secondary text-lg">
                  Manage quizzes, users, and platform settings
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-cosmic-border hover:border-neon-cyan/50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button className="neon-button text-cosmic-void font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => {
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

          {/* Quiz Management */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Quiz Management
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      Create, edit, and manage all platform quizzes
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <Input
                        placeholder="Search quizzes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-cosmic-surface/50 border-cosmic-border"
                      />
                    </div>
                    <Button variant="outline" className="border-cosmic-border">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      className="p-6 rounded-lg border border-cosmic-border hover:border-neon-cyan/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bai font-semibold text-text-primary">
                              {quiz.title}
                            </h3>
                            <Badge variant="outline" className={getStatusColor(quiz.status)}>
                              {quiz.status}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                              {quiz.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-text-secondary mb-4">
                            <div>
                              <span className="font-medium">Category:</span> {quiz.category}
                            </div>
                            <div>
                              <span className="font-medium">Questions:</span> {quiz.questions}
                            </div>
                            <div>
                              <span className="font-medium">Attempts:</span> {quiz.attempts}
                            </div>
                            <div>
                              <span className="font-medium">Avg Score:</span> {quiz.avgScore}%
                            </div>
                          </div>
                          
                          <p className="text-text-secondary text-sm">
                            Created on {quiz.created}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-6">
                          <Button variant="outline" size="sm" className="border-cosmic-border">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-cosmic-border">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-cosmic-border">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai">
                  Quick Create
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Start building a new quiz from scratch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quiz-title" className="text-text-primary">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    placeholder="Enter quiz title..."
                    className="mt-1 bg-cosmic-surface/50 border-cosmic-border"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz-category" className="text-text-primary">Category</Label>
                  <Input
                    id="quiz-category"
                    placeholder="e.g., Programming, Science..."
                    className="mt-1 bg-cosmic-surface/50 border-cosmic-border"
                  />
                </div>
                <Button className="w-full neon-button text-cosmic-void font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Latest platform activity and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-surface/30">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full" />
                    <div className="text-sm">
                      <p className="text-text-primary">New user registered: cosmic_learner</p>
                      <p className="text-text-secondary text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-surface/30">
                    <div className="w-2 h-2 bg-neon-pink rounded-full" />
                    <div className="text-sm">
                      <p className="text-text-primary">Quiz "React Hooks" completed by 5 users</p>
                      <p className="text-text-secondary text-xs">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-surface/30">
                    <div className="w-2 h-2 bg-neon-purple rounded-full" />
                    <div className="text-sm">
                      <p className="text-text-primary">System backup completed successfully</p>
                      <p className="text-text-secondary text-xs">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;