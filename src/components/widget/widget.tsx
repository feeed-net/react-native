import React, { useContext } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import Animated, { withTiming } from 'react-native-reanimated';
import type {
  FeedbackCategory,
  FeedbackWidgetStep,
  User,
} from '../../core/types';
import WidgetHeader from './widget-header';
import { FeedbackWidgetContext } from '../../context';
import { useSubmitFeedback } from '../../hooks/useSubmitFeedback';
import { getDeviceInfo } from '../../core/device';
import CategoryList from './category-list';
import FeedbackForm from './feedback-form';
import SuccessMessage from './success-message';

type FeedbackWidgetProps = {
  onSelectCategory?: (category: FeedbackCategory) => void;
  onOpen?: () => void;
  onClose?: () => void;
  projectId: string;
  title?: string;
  user?: User;
};

const FeedbackWidget = ({
  onSelectCategory,
  onOpen,
  onClose,
  projectId,
  title = 'How can we help?',
  user,
}: FeedbackWidgetProps) => {
  const ref = useRef<any>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const { submitFeedback, loading: submitLoading } = useSubmitFeedback();
  const safeBottomInset = useMemo(
    () => safeAreaInsets.bottom - 16,
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
      await submitFeedback({
        projectId,
        category: currentCategory,
        content: currentText,
        metadata: await getDeviceInfo(),
        user: user ? user : undefined,
      });
      setCurrentStep('success');
    } catch (error) {
      throw error;
    }
  }, [projectId, currentText, currentCategory, submitFeedback, user]);

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
      backgroundStyle={[styles.background]}
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

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 16,
    marginTop: -16,
  },
  container: {
    padding: 24,
  },
  background: {
    borderRadius: 24,
  },
});
export default FeedbackWidget;
