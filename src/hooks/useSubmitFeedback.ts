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

type FeedbackSubmitOptions = {
  /**
   * You can use this to override the default API URL.
   */
  apiUrl?: string;
};

/**
 * Provides functionality to submit feedback, including a loading state.
 *
 * @returns An object containing the loading state and a function to submit feedback.
 */
export const useSubmitFeedback = ({
  apiUrl,
}: FeedbackSubmitOptions): SubmitFeedback => {
  const [loading, setLoading] = useState(false);
  const url = apiUrl || 'https://api.feeed.net/feedback/submit';
  const submitFeedback = async (params: FeedbackSubmitParams) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: params.projectId,
          content: params.content,
          category: params.category,
          metadata: params.metadata,
          user: params.user,
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
