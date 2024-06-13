import * as React from 'react';

import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import {
  FeedbackWidgetProvider,
  FeedbackWidget,
  useFeedback,
} from '@feeed/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <FeedbackWidgetProvider>
        <AppContent />
        <FeedbackWidget projectId="upDiUIutVasT" />
      </FeedbackWidgetProvider>
    </SafeAreaProvider>
  );
}

const AppContent = () => {
  const { open } = useFeedback();
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={open}>
        <Text>Open Feedback Widget</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  widgetContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
