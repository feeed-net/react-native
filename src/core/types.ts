export type FeedbackWidgetContextType = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export type FeedbackWidgetStep = 'main' | 'write' | 'success';

export type FeedbackCategory = 'bug' | 'other' | string;
