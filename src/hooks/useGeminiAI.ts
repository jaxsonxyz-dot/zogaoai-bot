
import { useState, useRef } from 'react';
import { isSupabaseConfigured } from '@/lib/cms';
import { createSingleFlightLock, withTimeout } from '@/utils/requestGuard';

export const useGeminiAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const lockRef = useRef(createSingleFlightLock());

  const expandText = async (text: string): Promise<string> => {
    if (!text.trim() || lockRef.current.isLocked()) return text;
    if (!isSupabaseConfigured()) {
      throw new Error('AI text assistant requires cloud connection.');
    }

    const result = await lockRef.current.run(async () => {
      setIsProcessing(true);
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const invokePromise = supabase.functions.invoke('ai-text', {
          body: { text, action: 'expand' },
        });
        const response = await withTimeout(invokePromise, 10_000, {
          data: null,
          error: new Error('Request timed out on slow connection. Please try again.'),
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to expand text');
        }
        return response.data?.result || text;
      } finally {
        setIsProcessing(false);
      }
    });

    return result ?? text;
  };

  const correctGrammar = async (text: string): Promise<{ correctedText: string; hasErrors: boolean }> => {
    if (!text.trim() || lockRef.current.isLocked()) {
      return { correctedText: text, hasErrors: false };
    }
    if (!isSupabaseConfigured()) {
      throw new Error('AI grammar assistant requires cloud connection.');
    }

    const result = await lockRef.current.run(async () => {
      setIsProcessing(true);
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const invokePromise = supabase.functions.invoke('ai-text', {
          body: { text, action: 'grammar' },
        });
        const response = await withTimeout(invokePromise, 10_000, {
          data: null,
          error: new Error('Request timed out on slow connection. Please try again.'),
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to correct grammar');
        }

        const correctedText = response.data?.result || text;
        const hasErrors = correctedText.trim() !== text.trim();
        return { correctedText, hasErrors };
      } finally {
        setIsProcessing(false);
      }
    });

    return result ?? { correctedText: text, hasErrors: false };
  };

  return {
    expandText,
    correctGrammar,
    isProcessing,
    hasApiKey: isSupabaseConfigured(),
  };
};
