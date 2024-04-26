import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { FeedbackWidgetStep } from '../core/types';
import CloseIcon from './icons/close-icon';

type WidgetHeaderProps = {
  title: string;
  onClose: () => void;
  currentStep: FeedbackWidgetStep;
};

const WidgetHeader = ({ title, onClose, currentStep }: WidgetHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {' '}
        {currentStep === 'main'
          ? title
          : currentStep === 'write'
            ? 'What do want to share?'
            : currentStep === 'success'
              ? ''
              : 'Invalid step'}
      </Text>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <CloseIcon width={10} height={10} color={'#A1A1AA'} />
      </TouchableOpacity>
    </View>
  );
};

export default WidgetHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#27272A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    backgroundColor: '#F4F4F5',
    borderRadius: 999,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
