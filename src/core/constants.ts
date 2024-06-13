export let isExpo = false;
try {
  const Constants = require('expo-constants');
  const ExecutionEnvironment = require('expo-constants').ExecutionEnvironment;
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo = Constants.executionEnvironment !== ExecutionEnvironment.Bare;
} catch {}
