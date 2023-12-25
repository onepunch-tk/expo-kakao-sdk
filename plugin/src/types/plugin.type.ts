import { ExportedConfigWithProps } from "expo/config-plugins";

export interface PluginType {
  apiKey: string;
}

export interface URLScheme {
  CFBundleURLName?: string;
  CFBundleURLSchemes: string[];
}

export interface ExportedConfigWithKakaoAppKey<Data = any>
  extends ExportedConfigWithProps<Data> {
  modResults: Data & {
    KAKAO_APP_KEY: string | undefined;
    CFBundleURLTypes: URLScheme[];
  };
}
