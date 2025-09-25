import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useQuizzes } from '@/hooks/useQuizzes';
import { X, Plus, BookOpen } from 'lucide-react';

interface CreateQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Beginner',
    time_limit_minutes: 30,
  });
  const [loading, setLoading] = useState(false);
  const { createQuiz } = useQuizzes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await createQuiz({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        time_limit_minutes: formData.time_limit_minutes,
        is_published: false,
      });

      if (!error) {
        setFormData({
          title: '',
          description: '',
          category: '',
          difficulty: 'Beginner',
          time_limit_minutes: 30,
        });
        onOpenChange(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-card border-glass-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-maersk-blue/20 to-maersk-light-blue/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-maersk-blue" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bai font-semibold text-text-primary">
                Create New Quiz
              </DialogTitle>
              <DialogDescription className="text-text-secondary">
                Design an engaging quiz for your learners
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-text-primary font-medium">
              Quiz Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., JavaScript Fundamentals"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-11 bg-white border-neutral-light focus:border-maersk-blue/50 focus:ring-maersk-blue/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-text-primary font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this quiz covers..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="min-h-20 bg-white border-neutral-light focus:border-maersk-blue/50 focus:ring-maersk-blue/20"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-text-primary font-medium">
                Category
              </Label>
              <Input
                id="category"
                placeholder="e.g., Programming"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="h-11 bg-white border-neutral-light focus:border-maersk-blue/50 focus:ring-maersk-blue/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-text-primary font-medium">
                Difficulty
              </Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleChange('difficulty', value)}>
                <SelectTrigger className="h-11 bg-white border-neutral-light focus:border-maersk-blue/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeLimit" className="text-text-primary font-medium">
              Time Limit (minutes)
            </Label>
            <Input
              id="timeLimit"
              type="number"
              min="5"
              max="180"
              value={formData.time_limit_minutes}
              onChange={(e) => handleChange('time_limit_minutes', parseInt(e.target.value) || 30)}
              className="h-11 bg-white border-neutral-light focus:border-maersk-blue/50 focus:ring-maersk-blue/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-neutral-light">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-neutral-light hover:bg-neutral-lightest"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title.trim()}
              className="maersk-button text-white font-semibold px-6"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Create Quiz
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizModal;