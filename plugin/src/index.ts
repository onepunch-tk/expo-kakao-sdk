import { ConfigPlugin } from "expo/config-plugins";
import { PluginType } from "./types/plugin.type";
import { withIosPlugins } from "./ios/ios.plugin";

const withInitPlugins: ConfigPlugin<PluginType> = (
  config,
  props: PluginType
) => {
  config = withIosPlugins(config, props);
  return config;
};

export default withInitPlugins;
