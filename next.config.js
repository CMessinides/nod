require("dotenv").config();
require("isomorphic-fetch");

module.exports = {
	webpack: (config, { webpack }) => {
		config.plugins.push(new webpack.EnvironmentPlugin(["API_URL"]));
		return config;
	}
};
