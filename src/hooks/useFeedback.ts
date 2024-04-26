import { useCallback, useContext } from 'react';
import { FeedbackWidgetContext } from '../context';

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
