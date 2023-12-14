const { ModuleFederationPlugin } = require("webpack").container;

const federatedConfig = require("../../modulefederation.config.js");

const webpackConfigPath = "react-scripts/config/webpack.config";
const webpackConfig = require(webpackConfigPath);

const override = (config) => {
	config.plugins.push(new ModuleFederationPlugin(federatedConfig));

	config.plugins[0].userOptions = {
		...config.plugins[0].userOptions,
		publicPath: process.env.PUBLIC_URL,
		excludeChunks:
			process.env.NODE_ENV === "development" ? ["urto"] : undefined,
	};

	config.output.publicPath = "auto";

	return config;
};

require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
	override(webpackConfig(env));

module.exports = require(webpackConfigPath);

