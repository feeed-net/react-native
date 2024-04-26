# @feeed/react-native

A package

## Installation

```sh
npm install @feeed/react-native
```

```sh
yarn install @feeed/react-native
```

## Usage

```js
<SafeAreaProvider>
  <FeedbackWidgetProvider>
    // Your app content
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
