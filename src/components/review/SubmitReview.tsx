import React, { useState, useRef } from 'react';
import { Star, Send, Sparkles, CheckCircle } from 'lucide-react';
import { saveReview } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';

const SubmitReview = () => {
  const { toast } = useToast();
  const geminiAI = useGeminiAI();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleExpandText = async () => {
    if (!formData.text.trim()) {
      toast({
        title: 'Nothing to expand',
        description: 'Please write some text first',
        variant: 'destructive',
        duration: 1500,
      });
      return;
    }

    try {
      const expandedText = await geminiAI.expandText(formData.text);
      setFormData((prev) => ({
        ...prev,
        text: expandedText,
      }));

      toast({
        title: 'Text Expanded',
        description: 'Your message has been enhanced with AI assistance',
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to expand text',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleCorrectGrammar = async () => {
    if (!formData.text.trim()) {
      toast({
        title: 'Nothing to correct',
        description: 'Please write some text first',
        variant: 'destructive',
        duration: 1500,
      });
      return;
    }

    try {
      const result = await geminiAI.correctGrammar(formData.text);

      if (!result.hasErrors) {
        toast({
          title: 'Grammar Check Complete',
          description: 'Your text is already grammatically correct!',
          duration: 1500,
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        text: result.correctedText,
      }));

      toast({
        title: 'Grammar Corrected',
        description: 'Your message has been proofread by AI',
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to correct grammar',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronous single-flight lock: blocks 50-100 simultaneous clicks in the same millisecond
    if (submittingRef.current || isSubmitting) return;

    if (!formData.name.trim() || !formData.text.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill out all required fields',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const trimmedName = formData.name.trim();
    const initial = trimmedName.charAt(0).toUpperCase();

    saveReview({
      name: trimmedName,
      initial,
      role: formData.role.trim() || 'Happy Client',
      company: formData.company.trim() || 'Customer',
      text: formData.text.trim(),
      rating: formData.rating,
    });

    setTimeout(() => {
      submittingRef.current = false;
      setIsSubmitting(false);
      setFormData({
        name: '',
        role: '',
        company: '',
        text: '',
        rating: 5,
      });

      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback.',
        duration: 2000,
      });
    }, 1000);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-xl mb-8">
      <h3 className="text-xl md:text-2xl font-bold mb-6">
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="review-name"
            className="block text-sm font-medium text-zogago-light/80 mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="review-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
            placeholder="Your name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="review-role"
              className="block text-sm font-medium text-zogago-light/80 mb-1"
            >
              Role
            </label>
            <input
              type="text"
              id="review-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
              placeholder="Your position"
            />
          </div>

          <div>
            <label
              htmlFor="review-company"
              className="block text-sm font-medium text-zogago-light/80 mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="review-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
              placeholder="Your company"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="review-text"
              className="block text-sm font-medium text-zogago-light/80"
            >
              Review *
            </label>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleExpandText}
                disabled={geminiAI.isProcessing || !formData.text}
                className="text-xs flex items-center py-1 px-2 rounded bg-zogago-blue/10 text-zogago-blue hover:bg-gradient-to-r hover:from-zogago-blue/20 hover:via-zogago-purple/20 hover:to-zogago-pink/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Enhance Text
              </button>
              <button
                type="button"
                onClick={handleCorrectGrammar}
                disabled={geminiAI.isProcessing || !formData.text}
                className="text-xs flex items-center py-1 px-2 rounded bg-zogago-blue/10 text-zogago-blue hover:bg-gradient-to-r hover:from-zogago-blue/20 hover:via-zogago-purple/20 hover:to-zogago-pink/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Fix Grammar
              </button>
            </div>
          </div>
          <textarea
            id="review-text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
            placeholder={
              geminiAI.isProcessing
                ? 'Processing with AI...'
                : 'Tell us about your experience with ZOGAGO...'
            }
            required
            disabled={geminiAI.isProcessing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zogago-light/80 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                aria-label={`Rate ${rating} out of 5 stars`}
                onClick={() => handleRatingChange(rating)}
                className="p-1 focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${
                    rating <= formData.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-glow w-full group mt-4 disabled:opacity-60 disabled:pointer-events-none"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                Submit Review
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
