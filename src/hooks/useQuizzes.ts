import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  time_limit_minutes: number;
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: string;
  options: any;
  correct_answer: string;
  explanation: string | null;
  points: number;
  order_index: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  max_score: number;
  completed_at: string;
  time_taken_seconds: number | null;
  answers: any;
}

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('quizzes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quizzes'
        },
        () => {
          fetchQuizzes(); // Refetch on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const fetchQuizzes = async () => {
    try {
      let query = supabase.from('quizzes').select('*');
      
      if (!isAdmin) {
        query = query.eq('is_published', true);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setQuizzes((data as Quiz[]) || []);
    } catch (error: any) {
      toast({
        title: 'Error loading quizzes',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quiz: Omit<Quiz, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { data, error } = await supabase
        .from('quizzes')
        .insert([{ ...quiz, created_by: user.id }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Quiz created',
        description: 'Your quiz has been created successfully.',
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error creating quiz',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateQuiz = async (id: string, updates: Partial<Quiz>) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { data, error } = await supabase
        .from('quizzes')
        .update(updates)
        .eq('id', id)
        .eq('created_by', user.id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Quiz updated',
        description: 'Your quiz has been updated successfully.',
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error updating quiz',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteQuiz = async (id: string) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', id)
        .eq('created_by', user.id);

      if (error) throw error;

      toast({
        title: 'Quiz deleted',
        description: 'The quiz has been deleted successfully.',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error deleting quiz',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return {
    quizzes,
    loading,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    refetch: fetchQuizzes,
  };
};

export const useQuizQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('order_index');

      if (error) throw error;
      setQuestions((data as Question[]) || []);
    } catch (error: any) {
      toast({
        title: 'Error loading questions',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (question: Omit<Question, 'id' | 'created_at'>) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([question])
        .select()
        .single();

      if (error) throw error;
      
      await fetchQuestions(); // Refresh questions
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error adding question',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateQuestion = async (id: string, updates: Partial<Question>) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { data, error } = await supabase
        .from('questions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchQuestions(); // Refresh questions
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error updating question',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteQuestion = async (id: string) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchQuestions(); // Refresh questions
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error deleting question',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return {
    questions,
    loading,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    refetch: fetchQuestions,
  };
};