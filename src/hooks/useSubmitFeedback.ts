import { useState } from 'react';
import type { FeedbackSubmitParams } from '../core/types';

type SubmitFeedback = {
  /**
   * Indicates whether a feedback submission is in progress.
   */
  loading: boolean;

  /**
   * Submits feedback with the specified parameters.
   * @returns A promise that resolves when the feedback submission is complete.
   */
  submitFeedback: (params: FeedbackSubmitParams) => Promise<void>;
};

/**
 * Provides functionality to submit feedback, including a loading state.
 *
 * @returns An object containing the loading state and a function to submit feedback.
 */
export const useSubmitFeedback = (): SubmitFeedback => {
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (params: FeedbackSubmitParams) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.feeed.net/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: params.projectId,
          content: params.content,
          category: params.category,
          metadata: params.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${await response.text()}`
        );
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
