import React, { useContext } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import Animated, { withTiming } from 'react-native-reanimated';
import type { FeedbackCategory, FeedbackWidgetStep } from '../core/types';
import WidgetHeader from './widget-header';
import { FeedbackWidgetContext } from '../context';
import BugIcon from './icons/bug-icon';
import MessageIcon from './icons/message-icon';
import { useFeedbackSubmit } from '../hooks/useSubmitFeedback';
import { getDeviceInfo } from '../core/device';

type FeedbackWidgetProps = {
  onSelectCategory?: (category: FeedbackCategory) => void;
  onOpen?: () => void;
  onClose?: () => void;
  projectId: string;
  title?: string;
};

const FeedbackWidget = ({
  onSelectCategory,
  onOpen,
  onClose,
  projectId,
  title = 'How can we help?',
}: FeedbackWidgetProps) => {
  const ref = useRef<any>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const { submitFeedback, loading: submitLoading } = useFeedbackSubmit();
  const safeBottomInset = useMemo(
    () => safeAreaInsets.bottom + 8,
    [safeAreaInsets]
  );
  const { isOpen, setOpen } = useContext(FeedbackWidgetContext);
  const [isKeyboardMoving, setIsKeyboardMoving] = useState(false);
  const [currentStep, setCurrentStep] = useState<FeedbackWidgetStep>('main');
  const [currentCategory, setCurrentCategory] = useState<FeedbackCategory>('');
  const [currentText, setCurrentText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setIsKeyboardMoving(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardMoving(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      ref.current?.present();
      onOpen?.();
    } else {
      ref.current?.dismiss();
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  const onCloseCallback = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setCurrentStep('main');
      setCurrentCategory('');
      setCurrentText('');
    }, 500);
  }, [setOpen]);

  const onClickOutside = useCallback(() => {
    if (isKeyboardMoving) {
      Keyboard.dismiss();
    } else {
      onCloseCallback();
    }
  }, [isKeyboardMoving, onCloseCallback]);

  const onSelectCategoryCallback = useCallback(
    (category: FeedbackCategory) => {
      setCurrentStep('write');
      setCurrentCategory(category);
      onSelectCategory?.(category);
    },
    [onSelectCategory]
  );
  const onChangeTextCallback = useCallback((text: string) => {
    setCurrentText(text);
  }, []);

  const onSubmitCallback = useCallback(async () => {
    if (!currentText) {
      return;
    }
    try {
      console.log('Submitting feedback', await getDeviceInfo());
      await submitFeedback({
        projectId,
        category: currentCategory,
        content: currentText,
        metadata: await getDeviceInfo(),
      });
      setCurrentStep('success');
    } catch (error) {
      console.error(error);
    }
  }, [projectId, currentText, currentCategory, submitFeedback]);

  const entering: any = useCallback(() => {
    'worklet';
    const animations = {
      opacity: withTiming(1, { duration: 50 }),
      transform: [
        { translateY: withTiming(0, { duration: 300 }) },
        { scale: withTiming(1, { duration: 300 }) },
      ],
    };
    const initialValues = {
      opacity: 0,
      transform: [{ translateY: 5 }, { scale: 0.985 }],
    };
    return {
      initialValues,
      animations,
    };
  }, []);

  const BackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          onClickOutside();
        }}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
      />
    ),
    [onClickOutside]
  );
  return (
    <BottomSheetModal
      ref={ref}
      onDismiss={onCloseCallback}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      backdropComponent={BackDrop}
      bottomInset={safeBottomInset}
      contentHeight={300}
      detached
      enableDynamicSizing
      handleComponent={() => null}
      style={styles.modal}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={[styles.container]}>
        <WidgetHeader
          title={title}
          currentStep={currentStep}
          onClose={onCloseCallback}
        />
        {currentStep === 'main' && (
          <Animated.View entering={entering}>
            <CategoryList onSelectCategory={onSelectCategoryCallback} />
          </Animated.View>
        )}
        {currentStep === 'write' && (
          <Animated.View entering={entering}>
            <FeedbackForm
              inputRef={inputRef}
              onChangeText={onChangeTextCallback}
              loading={submitLoading}
              onSubmit={onSubmitCallback}
            />
          </Animated.View>
        )}
        {currentStep === 'success' && (
          <Animated.View entering={entering}>
            <SuccessMessage />
          </Animated.View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

type CategoryListProps = {
  onSelectCategory: (category: FeedbackCategory) => void;
};
const CategoryList = ({ onSelectCategory }: CategoryListProps) => (
  <View style={styles.categoryList}>
    <CategoryItem
      icon={<BugIcon width={20} height={20} color={'#fff'} />}
      color="#F97316"
      title="Report Bug"
      description="Let us know about a specific issue you’re experiencing"
      onSelect={() => onSelectCategory('bug')}
    />
    <CategoryItem
      icon={<MessageIcon width={20} height={20} color={'#fff'} />}
      color="#6366F1"
      title="Something Else"
      description="Share Feedback, Ideas, or anything else"
      onSelect={() => onSelectCategory('other')}
    />
  </View>
);

type CategoryItemProps = {
  icon: React.ReactElement;
  color: string;
  title: string;
  description: string;
  onSelect: () => void;
};

const CategoryItem = ({
  icon,
  color,
  title,
  description,
  onSelect,
}: CategoryItemProps) => (
  <TouchableOpacity style={styles.categoryListItem} onPress={onSelect}>
    <View style={[styles.categoryIcon, { backgroundColor: color }]}>
      {icon}
    </View>
    <View style={styles.categoryTextContainer}>
      <Text style={styles.categoryHeadingText}>{title}</Text>
      <Text style={styles.categoryDescriptionText}>{description}</Text>
    </View>
  </TouchableOpacity>
);

type FeedbackFormProps = {
  inputRef: any;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  loading: boolean;
};
const FeedbackForm = ({
  inputRef,
  onChangeText,
  onSubmit,
  loading,
}: FeedbackFormProps) => (
  <View style={styles.submitFormContainer}>
    <View style={styles.textInputContainer}>
      <BottomSheetTextInput
        ref={inputRef}
        multiline
        editable
        onSubmitEditing={Keyboard.dismiss}
        maxLength={500}
        placeholder="Write your feedback here"
        style={styles.textInput}
        placeholderTextColor="#A1A1AA"
        onChangeText={onChangeText}
      />
    </View>
    <TouchableOpacity
      style={styles.submitButton}
      onPress={onSubmit}
      disabled={loading}
    >
      <Text style={styles.submitButtonText}>Submit Feedback</Text>
    </TouchableOpacity>
  </View>
);

const SuccessMessage = () => (
  <View style={styles.successContainer}>
    <Text style={styles.successText}>Thank you for your feedback!</Text>
  </View>
);

const styles = StyleSheet.create({
  modal: { marginHorizontal: 16 },
  container: { padding: 24 },
  background: { borderRadius: 24 },
  categoryList: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  categoryListItem: {
    backgroundColor: '#F4F4F5',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 14,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTextContainer: { flexDirection: 'column', flex: 1, gap: 4 },
  categoryHeadingText: { fontSize: 18, fontWeight: '600', color: '#27272A' },
  submitFormContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  textInputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    minHeight: 100,
  },
  categoryDescriptionText: {
    fontSize: 16,
    color: '#71717A',
    fontWeight: '500',
  },
  textInput: { color: '#27272A', flex: 1, fontSize: 16 },
  submitButton: {
    backgroundColor: '#27272A',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  successContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    marginBottom: 32,
  },
  successText: { fontSize: 18, fontWeight: '600', color: '#27272A' },
});

export default FeedbackWidget;
