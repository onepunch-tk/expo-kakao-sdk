import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoKakaoSdk from "expo-kakao-sdk";
import { useState } from "react";

interface AuthUser {
  userId: number;
  email: string;
  nickname: string;
  avatar: string;
}

export default function App() {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const kakaologin = async () => {
    const result = await ExpoKakaoSdk.kakaoLogin();
    if (result.success) {
      const response = await ExpoKakaoSdk.getAuthUer();
      console.log(response["authUser"].avatar);
      setAuthUser(response["authUser"] as AuthUser);
    }
  };
  console.log("authUser:", authUser);
  return (
    <View style={styles.container}>
      {!authUser ? <Button title={"kakao login"} onPress={kakaologin} /> : null}
      {authUser ? <Text>{authUser.nickname}</Text> : null}
      {authUser ? <Text>{authUser.email}</Text> : null}
      {authUser ? <Text>{authUser.userId}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
