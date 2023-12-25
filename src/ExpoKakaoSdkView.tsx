import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoKakaoSdkViewProps } from './ExpoKakaoSdk.types';

const NativeView: React.ComponentType<ExpoKakaoSdkViewProps> =
  requireNativeViewManager('ExpoKakaoSdk');

export default function ExpoKakaoSdkView(props: ExpoKakaoSdkViewProps) {
  return <NativeView {...props} />;
}
