export type FeedbackWidgetContextType = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export type FeedbackWidgetStep = 'main' | 'write' | 'success';

export type FeedbackCategory = 'bug' | 'other' | string;

export type UseFeedbackSubmitOptions = {
  projectId: string;
  category: string;
  content: string;
  metadata: Metadata;
};
export type Metadata = {
  os: {
    name: string;
    version: string;
  };
  client: {
    name: string;
    type: string;
    version: string;
    build: string;
  };
  device: {
    type: 'tablet' | 'smartphone';
    brand: string;
    model: string;
    deviceId: string;
  };
};
