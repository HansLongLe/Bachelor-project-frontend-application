const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
require("dotenv").config({ path: __dirname + `/.env.${env}` });
const { dependencies } = require("./package.json");

const REMOTE_DOMAIN =
	process.env.REMOTE_DOMAIN ||
	(() => {
		throw new Error("REMOTE_DOMAIN environmental variable not set");
	})();

module.exports = {
	name: "urto",
	filename: "remoteEntry.js",
	remotes: {
		"@remotes/coreState": `coreState@https://${REMOTE_DOMAIN}/mf/core-state/remoteEntry.js`,
		"@remotes/coreAuth": `coreAuth@https://${REMOTE_DOMAIN}/mf/core-auth/remoteEntry.js`,
	},
	exposes: {
		// "./moduleIntegration": "./src/exposes/moduleIntegration",
	},
	shared: {
		...dependencies,
		react: {
			singleton: true,
			requiredVersion: dependencies["react"],
		},
		"react-dom": {
			singleton: true,
			requiredVersion: dependencies["react-dom"],
		},
	},
};

