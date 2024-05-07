import { useState } from 'react';
import type { UseFeedbackSubmitOptions } from '../core/types';

type UseFeedbackSubmitResult = {
  loading: boolean;
  submitFeedback: (options: UseFeedbackSubmitOptions) => Promise<void>;
};

export const useFeedbackSubmit = (): UseFeedbackSubmitResult => {
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (options: UseFeedbackSubmitOptions) => {
    setLoading(true);
    try {
      const res = await fetch('https://submit.feeed.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: options.projectId,
          content: options.content,
          category: options.category,
          metadata: options.metadata,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitFeedback };
};
