import * as React from 'react';

import { ExpoKakaoSdkViewProps } from './ExpoKakaoSdk.types';

export default function ExpoKakaoSdkView(props: ExpoKakaoSdkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
