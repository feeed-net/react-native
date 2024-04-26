import React from 'react';
import { useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackWidgetContext } from '../context';
import { StyleSheet } from 'react-native';

type FeedbackWidgetProviderProps = {
  children: React.ReactNode;
};

export const FeedbackWidgetProvider = ({
  children,
}: FeedbackWidgetProviderProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <FeedbackWidgetContext.Provider value={{ isOpen, setOpen }}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </FeedbackWidgetContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
