import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessMessage = () => (
  <View style={styles.successContainer}>
    <Text style={styles.successText}>Thank you for your feedback!</Text>
  </View>
);

export default SuccessMessage;

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    marginBottom: 32,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27272A',
  },
});
