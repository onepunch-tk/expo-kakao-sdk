import { ConfigPlugin, withInfoPlist } from "expo/config-plugins";
import {
  ExportedConfigWithKakaoAppKey,
  PluginType,
  URLScheme,
} from "../types/plugin.type";

const QUERIES_SCHEMES = ["kakaokompassauth", "kakaolink", "kakaoplus"];

const setInfoPlist: ConfigPlugin<PluginType> = (config, { apiKey }) => {
  return withInfoPlist(config, (config: ExportedConfigWithKakaoAppKey) => {
    config.modResults.LSApplicationQueriesSchemes = QUERIES_SCHEMES;
    config.modResults.KAKAO_APP_KEY = apiKey;
    const NEW_URL_TYPES = `kakao${apiKey}`;

    const urlType = config.modResults.CFBundleURLTypes.find(
      (urlScheme: URLScheme) =>
        urlScheme.CFBundleURLSchemes.includes(NEW_URL_TYPES)
    );

    if (!urlType) {
      config.modResults.CFBundleURLTypes.push({
        CFBundleURLSchemes: [NEW_URL_TYPES],
      });
    }

    return config;
  });
};

export const withIosPlugins: ConfigPlugin<PluginType> = (config, props) => {
  config = setInfoPlist(config, props);
  return config;
};
