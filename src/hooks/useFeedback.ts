import { useCallback, useContext } from 'react';
import { FeedbackWidgetContext } from '../context';

/**
 * A hook to control the built infeedback widget.
 *
 * @returns {Object} An object containing functions to open and close the feedback widget.
 * @returns {Function} open - Function to open the feedback widget.
 * @returns {Function} close - Function to close the feedback widget.
 */
export const useFeedback = () => {
  const { setOpen } = useContext(FeedbackWidgetContext);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return { open, close };
};
