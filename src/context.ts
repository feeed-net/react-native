import { createContext } from 'react';
import type { FeedbackWidgetContextType } from './core/types';

export const FeedbackWidgetContext = createContext<FeedbackWidgetContextType>({
  isOpen: false,
  setOpen: () => {},
});
