import {
  EventEmitter,
  NativeModulesProxy,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoKakaoSdk.web.ts
// and on native platforms to ExpoKakaoSdk.ts
import ExpoKakaoSdkModule from "./ExpoKakaoSdkModule";
import ExpoKakaoSdkView from "./ExpoKakaoSdkView";
import {
  ChangeEventPayload,
  ExpoKakaoSdkViewProps,
} from "./ExpoKakaoSdk.types";

// Get the native constant value.
export const PI = ExpoKakaoSdkModule.PI;

export function hello(): string {
  return ExpoKakaoSdkModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoKakaoSdkModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoKakaoSdkModule ?? NativeModulesProxy.ExpoKakaoSdk
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export async function kakaoLogin() {
  return ExpoKakaoSdkModule.kakaoLogin();
}

export async function getAuthUer() {
  return ExpoKakaoSdkModule.getAuthUser();
}

export { ExpoKakaoSdkView, ExpoKakaoSdkViewProps, ChangeEventPayload };
