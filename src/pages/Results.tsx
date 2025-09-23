import { motion } from 'framer-motion';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Share2, 
  Home,
  CheckCircle2,
  XCircle,
  Award,
  TrendingUp
} from 'lucide-react';

const Results = () => {
  const { id } = useParams();
  const location = useLocation();
  const { score, totalQuestions, answers, quiz, timeSpent } = location.state || {};

  // Calculate results
  const percentage = Math.round((score / totalQuestions) * 100);
  const timeFormatted = Math.floor(timeSpent / 60) + ':' + (timeSpent % 60).toString().padStart(2, '0');
  
  // Determine performance level
  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Exceptional', color: 'text-neon-cyan', bg: 'from-neon-cyan to-neon-purple' };
    if (percentage >= 80) return { level: 'Excellent', color: 'text-success', bg: 'from-green-400 to-blue-500' };
    if (percentage >= 70) return { level: 'Good', color: 'text-warning', bg: 'from-yellow-400 to-orange-500' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-400', bg: 'from-orange-400 to-red-400' };
    return { level: 'Needs Improvement', color: 'text-destructive', bg: 'from-red-400 to-pink-500' };
  };

  const performance = getPerformanceLevel(percentage);

  // Mock achievements earned
  const achievementsEarned = [
    ...(percentage === 100 ? [{ icon: Award, title: 'Perfect Score!', description: 'Scored 100% on a quiz' }] : []),
    ...(timeSpent < 300 ? [{ icon: Clock, title: 'Speed Demon', description: 'Completed quiz in under 5 minutes' }] : []),
  ];

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-10" />
      
      {/* Confetti Effect for Perfect Score */}
      {percentage === 100 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-cyan rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${performance.bg} animate-spin`} />
            <div className="absolute inset-2 rounded-full bg-cosmic-void flex items-center justify-center">
              <Trophy className="w-8 h-8 text-neon-cyan" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bai font-bold heading-cosmic mb-2">
            Quiz Complete!
          </h1>
          <p className="text-text-secondary text-lg">
            {quiz?.title || 'Quiz Results'}
          </p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          <Card className="glass-card border-glass-border/50 text-center">
            <CardContent className="p-8">
              <div className="relative w-48 h-48 mx-auto mb-6">
                {/* Circular Progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="hsl(var(--cosmic-border))"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100) }}
                    transition={{ delay: 0.5, duration: 2, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                      <stop offset="100%" stopColor="hsl(var(--neon-pink))" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-bai font-bold heading-cosmic">
                      {percentage}%
                    </div>
                    <div className="text-text-secondary">
                      {score}/{totalQuestions}
                    </div>
                  </motion.div>
                </div>
              </div>

              <Badge className={`${performance.color} bg-transparent border-current mb-4 text-lg px-6 py-2`}>
                {performance.level}
              </Badge>
              
              <p className="text-text-secondary">
                You answered {score} out of {totalQuestions} questions correctly
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-neon-cyan" />
                    <span className="text-text-secondary">Accuracy</span>
                  </div>
                  <span className="text-text-primary font-semibold">{percentage}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-cyan" />
                    <span className="text-text-secondary">Time Taken</span>
                  </div>
                  <span className="text-text-primary font-semibold">{timeFormatted}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-text-secondary">Correct</span>
                  </div>
                  <span className="text-success font-semibold">{score}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-text-secondary">Incorrect</span>
                  </div>
                  <span className="text-destructive font-semibold">{totalQuestions - score}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai">
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to={`/quiz/${id}`}>
                  <Button className="w-full neon-button text-cosmic-void font-semibold">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full border-cosmic-border hover:border-neon-cyan/50"
                  disabled
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    className="w-full border-cosmic-border hover:border-neon-cyan/50"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                
                <Link to="/analytics">
                  <Button 
                    variant="outline" 
                    className="w-full border-cosmic-border hover:border-neon-cyan/50"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        {achievementsEarned.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="glass-card border-glass-border/50">
              <CardHeader>
                <CardTitle className="text-text-primary font-bai flex items-center gap-2">
                  <Award className="w-5 h-5 text-neon-cyan" />
                  New Achievements Unlocked!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievementsEarned.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border border-neon-cyan/20"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-neon-cyan" />
                        </div>
                        <div>
                          <h3 className="font-bai font-semibold text-text-primary">
                            {achievement.title}
                          </h3>
                          <p className="text-text-secondary text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Question Breakdown */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="glass-card border-glass-border/50">
            <CardHeader>
              <CardTitle className="text-text-primary font-bai">
                Question Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz?.questions?.map((question: any, index: number) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border border-cosmic-border">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-text-primary font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="text-sm text-text-secondary">
                            <p>Your answer: {userAnswer !== null ? question.options[userAnswer] : 'Skipped'}</p>
                            <p>Correct answer: {question.options[question.correctAnswer]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;