import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  SkipForward, 
  Flag, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Timer
} from 'lucide-react';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock quiz data
  const mockQuiz = {
    id: id || '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JS basics',
    timeLimit: 20,
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
          "var myVariable = 5;",
          "variable myVariable = 5;",
          "v myVariable = 5;",
          "declare myVariable = 5;"
        ],
        correctAnswer: 0,
        explanation: "The 'var' keyword is one of the ways to declare variables in JavaScript, along with 'let' and 'const'."
      },
      {
        id: 2,
        question: "Which method is used to add an element to the end of an array?",
        options: [
          "append()",
          "push()",
          "add()",
          "insert()"
        ],
        correctAnswer: 1,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
      },
      {
        id: 3,
        question: "What does '===' compare in JavaScript?",
        options: [
          "Only values",
          "Only types",
          "Both value and type",
          "Neither value nor type"
        ],
        correctAnswer: 2,
        explanation: "The '===' operator (strict equality) compares both value and type, while '==' only compares values with type coercion."
      }
    ]
  };

  const totalQuestions = mockQuiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(totalQuestions).fill(null));
  }, [totalQuestions]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleQuizComplete();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setIsAnswered(true);
    setShowFeedback(true);

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        handleNextQuestion();
      } else {
        handleQuizComplete();
      }
    }, 2500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowFeedback(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleSkipQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = null;
    setAnswers(newAnswers);
    handleNextQuestion();
  };

  const handleQuizComplete = () => {
    const score = answers.reduce((total, answer, index) => {
      return answer === mockQuiz.questions[index].correctAnswer ? total + 1 : total;
    }, 0);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${totalQuestions} questions correctly.`,
    });

    navigate(`/results/${id}`, { 
      state: { 
        score, 
        totalQuestions, 
        answers, 
        quiz: mockQuiz,
        timeSpent: (mockQuiz.timeLimit * 60) - timeLeft
      } 
    });
  };

  const currentQ = mockQuiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-5" />
      
      {/* Quiz Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Header */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bai font-bold text-text-primary">
                {mockQuiz.title}
              </h1>
              <p className="text-text-secondary">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-text-secondary">
                <Timer className="w-4 h-4" />
                <span className={`font-mono ${timeLeft < 300 ? 'text-warning' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan">
                <Flag className="w-3 h-3 mr-1" />
                Quiz Mode
              </Badge>
            </div>
          </div>
          
          <Progress 
            value={progress} 
            className="h-2 bg-cosmic-border"
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-card border-glass-border/50 mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bai font-semibold text-text-primary mb-8">
                  {currentQ.question}
                </h2>
                
                <div className="grid gap-4">
                  {currentQ.options.map((option, index) => {
                    let buttonClass = "w-full p-6 text-left border-2 rounded-xl transition-all duration-300 hover:scale-[1.02]";
                    
                    if (!isAnswered) {
                      buttonClass += " border-cosmic-border hover:border-neon-cyan/50 hover:bg-cosmic-surface/50";
                    } else if (index === currentQ.correctAnswer) {
                      buttonClass += " border-success bg-success/10 text-success glow-sm";
                    } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                      buttonClass += " border-destructive bg-destructive/10 text-destructive";
                    } else {
                      buttonClass += " border-cosmic-border opacity-50";
                    }

                    return (
                      <motion.button
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{option}</span>
                          {showFeedback && index === currentQ.correctAnswer && (
                            <CheckCircle2 className="w-6 h-6 text-success" />
                          )}
                          {showFeedback && index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                            <XCircle className="w-6 h-6 text-destructive" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className={`mt-6 p-4 rounded-lg border ${
                        isCorrect 
                          ? 'bg-success/10 border-success/30' 
                          : 'bg-destructive/10 border-destructive/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                        )}
                        <div>
                          <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </p>
                          <p className="text-text-secondary text-sm mt-1">
                            {currentQ.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleSkipQuestion}
            disabled={isAnswered}
            className="border-cosmic-border hover:border-neon-cyan/50"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip Question
          </Button>

          {!isAnswered && (
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="neon-button text-cosmic-void font-semibold"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;