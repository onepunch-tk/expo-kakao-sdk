import { StyleSheet, Text, View } from 'react-native';

import * as ExpoKakaoSdk from 'expo-kakao-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoKakaoSdk.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
