# @feeed/react-native

A package

## Installation

1. Install the package:

```sh
yarn install @feeed/react-native
```

2. Install the dependencies:

```sh
yarn add react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

## Usage

```js
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
