# Feeed React Native Widget

Used to collect feedback from your users and send it to your Feeed dashboard.

### Usage with Expo

Install following expo dependencies:

```bash
expo install @feeed/react-native react-native-gesture-handler react-native-reanimated react-native-safe-area-context expo-device expo-constants
```

### Usage with React Native

Install following dependencies:

```bash
yarn add @feeed/react-native react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-device-info
```

Please follow the official documentation of those libraries on how to link them correctly.

## Usage

```js
import { FeedbackWidgetProvider, FeedbackWidget } from '@feeed/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

<SafeAreaProvider>
  <FeedbackWidgetProvider>
    /* Your app content */
    <FeedbackWidget projectId="[projectId]" />
  </FeedbackWidgetProvider>
</SafeAreaProvider>;

//open the widget from anywhere in your app
const { open } = useFeedback();
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
