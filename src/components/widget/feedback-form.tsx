import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

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
}: FeedbackFormProps) => {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { easing: Easing.linear, duration: 700 }),
      -1
    );
  }, [rotation]);
  const loaderAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return (
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
        {loading && (
          <Animated.View style={[styles.loaderIcon, loaderAnimationStyle]} />
        )}
      </TouchableOpacity>
    </View>
  );
};
export default FeedbackForm;

const styles = StyleSheet.create({
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
  textInput: {
    color: '#27272A',
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#27272A',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  loaderIcon: {
    width: 12,
    height: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderBottomColor: 'white',
    borderLeftColor: 'white',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
